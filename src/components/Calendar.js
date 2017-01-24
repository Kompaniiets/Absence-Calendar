import React from 'react';
import ModalWindow from './ModalWindow';
import Month from './Month';
import DropDownMonth from './DropDown/DropDownMonth';
import DropDownYear from './DropDown/DropDownYear';
import TodayAbsence from './TodayAbsence';
import TodayDate from './TodayDate';
import AddNewUser from './AdminOptions/AddNewUser';

var Calendar = React.createClass({
	getInitialState: function () {
		return {
			tmpMonth: new Date().getMonth(),
			tmpYear: new Date().getFullYear()
		};
	},

	handleChange: function (value) {
		var monthNumber = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'].indexOf(value.toLowerCase());
		this.setState({ tmpMonth: monthNumber });
	},

	handleChangeYear: function (value) {
		this.setState({ tmpYear: value });
	},

	render: function () {
		return (
			<div className="container">
				<div className="mdl-cell">
					<h1 className="top-name">Calendar</h1>
				</div>
				<div className="middle-content">
					<div className="dropdown col-md-6">
						<DropDownMonth handleChange={this.handleChange} />
						<DropDownYear handleChange={this.handleChangeYear} />
					</div>
					<div className="col-md-3">
						<AddNewUser />
					</div>
					<div className="col-md-3">
						<ModalWindow />
					</div>
				</div>
				<div className="wrapper col-md-9">
					<div className="days-header">
						<ul>
							<li>Monday</li>
							<li>Tuesday</li>
							<li>Wednesday</li>
							<li>Thursday</li>
							<li>Friday</li>
							<li className="weekend">Saturday</li>
							<li className="weekend">Sunday</li>
						</ul>
					</div>
					<div className="month-view">
						<Month checkedMonth={this.state.tmpMonth} checkedYear={this.state.tmpYear} />
					</div>
				</div>

				<div className="col-md-3">
					<TodayDate />
					<TodayAbsence />
				</div>
			</div>
		)
	}
});

module.exports = Calendar;