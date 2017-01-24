require("babel-register");

const path = require('path');
const Server = require('http');
const Express = require('express');
const React = require('react');
const ReactDOM = require('react-dom/server');
const Router = require('react-router');
const routes = require('./src/routes');
const bodyParser = require('body-parser');
const session = require('express-session')

const ldap = require('ldapjs');
var client = ldap.createClient({
	url: 'ldap://localhost:10389/o=mojo'
});

// MongoDB
const mongoose = require('./src/data/mongo');
const Absence = require('./src/data/models/absence');

const app = Express();
const server = Server.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/static'));

app.use(Express.static(path.join(__dirname, 'src/static')));
app.use('/js', Express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', Express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', Express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: 'tesseris',
	cookie: { maxAge: 60 * 60 * 1000 }
}));

var userForSession = null;
var sess;

function auth(req, res, next) {
	sess = req.session;
	if (sess.user) {
		next();
	}
	else {
		res.end('<a href="/login">Please login</a>');
	}
}

app.post('/add-user', function (req, res, next) {

	var userInfo = req.body;

	var newDN = 'cn=' + userInfo.fullName + ',ou=users,o=mojo';
	var newUser = {
		cn: userInfo.fullName,
		sn: userInfo.login,
		uid: userInfo.uid,
		mail: userInfo.email,
		objectClass: 'inetOrgPerson',
		userPassword: userInfo.password
	}

	var opts = {
		filter: '(cn=' + userInfo.fullName + ')',
		scope: 'sub'
	};

	client.search('ou=users,o=mojo', opts, function (err, search) {
		var user = null;
		search.on('searchEntry', function (entry) {
			user = entry.object.dn;
		});
		search.on('searchReference', function (referral) {
			console.log('referral: ' + referral.uris.join());
		});
		search.on('error', function (err) {
			console.error('error: ' + err.message);
		});
		search.on('end', function (result) {
			if (!user) {
				client.add(newDN, newUser, function (err) {
					if (err) {
						console.log(err)
					}
					else {
						res.redirect('/calendar');
					}
				});
			}
			else {
				res.sendStatus(409);
			}
		});
	});
});

app.post('/login', function (req, res, next) {
	sess = req.session;
	var userInfo = req.body;

	var opts = {
		filter: '(sn=' + userInfo.userName + ')',
		scope: 'sub'
	};

	client.bind(userInfo.userName, userInfo.password, function (err) {
		client.search('ou=users,o=mojo', opts, function (err, search) {
			var user = null;
			search.on('searchEntry', function (entry) {
				user = entry.object.dn;
				userForSession = entry.object;
			});
			search.on('searchReference', function (referral) {
				console.log('referral: ' + referral.uris.join());
			});
			search.on('error', function (err) {
				console.error('error: ' + err.message);
			});
			search.on('end', function (result) {
				if (user) {
					client.bind(user, userInfo.password, function (err) {
						if (err) {
							res.sendStatus(409);
						} else {
							if (userForSession.uid == 'admin') {
								sess.admin = true;
							}
							else {
								sess.admin = false;
							}
							sess.user = userForSession.cn;
							res.redirect('/api/calendar');
						}
					});
				}
				else {
					res.sendStatus(409);
				}
			});
		});
	});
});

app.get('/api/calendar', auth, function (req, res, next) {
	sess = req.session;

	var users = [];
	var opts = {
		filter: '(&(objectClass=person)(objectClass=inetOrgPerson))',
		scope: 'sub'
	};

	client.search('ou=users,o=mojo', opts, function (err, search) {
		search.on('searchEntry', function (entry) {
			if (entry.object.cn != sess.user) {
				users.push(entry.object.cn);
			}
			else {
				users.push("Me");
			}
		});
		search.on('searchReference', function (referral) {
			console.log('referral: ' + referral.uris.join());
		});
		search.on('error', function (err) {
			console.error('error: ' + err.message);
		});
		search.on('end', function (result) {
			Absence.find({}, 'name startDate endDate startTime endTime reason description communication', function (err, result) {
				if (err) {
					console.log(err);
					res.send('Not found');
				}
				else {
					res.send({ absenceList: result, usersList: users, isAdmin: sess.admin });
				}
			});
		});
	});
});

app.get('/calendar', function (req, res, next) {
	sess = req.session;
	if (sess.user) {
		next();
	}
	else {
		res.end('<a href="/login">Please login</a>');
	}
})

app.post('/api/calendar', function (req, res) {

	function getTimeFromDate(date, time) {
		var year = new Date(date).getFullYear();
		var month = new Date(date).getMonth();
		var day = new Date(date).getDate();

		var hour = new Date(time).getHours();
		var minute = new Date(time).getMinutes();

		return new Date(year, month, day, hour, minute)
	}

	var absence = new Absence({
		userid: sess.id,
		name: (req.body.absenceUser != "Me") ? req.body.absenceUser : sess.user,
		reason: req.body.reason,
		communication: req.body.communication,
		startDate: req.body.startDate,
		endDate: (new Date(req.body.endDate) < new Date(req.body.startDate)) ? req.body.startDate : req.body.endDate,
		startTime: getTimeFromDate(req.body.startDate, req.body.startTime),
		endTime: getTimeFromDate(req.body.startDate, req.body.endTime),
		description: req.body.description
	});

	absence.save(function (err, absence) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		} else {
			res.redirect('/calendar');
		}
	});
});

app.get('*', (req, res) => {
	sess = req.session;
	Router.match(
		{ routes: routes.default, location: req.url },
		(err, redirectLocation, renderProps) => {

			if (err) {
				return res.status(500).send(err.message);
			}

			if (redirectLocation) {
				return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
			}

			let markup;
			if (renderProps) {
				markup = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
			} else {
				markup = ReactDOM.renderToString(React.createElement(Router.RouterContext, renderProps));
				res.status(404).send('Page Not Found')
			}
			return res.render('index', { markup });
		}
	);
});

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, err => {
	if (err) {
		console.log(err);
		return;
	}
	console.info(`Server running on http://localhost:${port} [${env}]`);
});