import React from 'react';
import Actions from '../actions/Actions.js';
import LoginStore from '../stores/LoginStore';

function getState() {
    return {
        userName: "", password: ""
    };
}

var LoginUser = React.createClass({

    getInitialState: function () {
        return getState();
    },
    componentDidMount: function () {
        LoginStore.addChangeListener(this.onChange);
    },
    componentWillUnmount: function () {
        LoginStore.removeChangeListener(this.onChange);
    },
    onChange: function (state) {
        this.setState(state);
    },

    handleUserNameChange (event) {
        this.setState({
            userName: event.target.value
        });
    },
    handlePasswordChange (event) {
        this.setState({
            password: event.target.value
        });
    },

    handleSubmit: function (event) {
        event.preventDefault();

       var login = {
            userName: this.state.userName,
            password: this.state.password
        }

        if (login.userName && login.password) {
            Actions.loginUser(login)
        }
        else {
            alert('Please, enter correct name and password');
        }
    },

    render: function () {

        return (

            <div className="container">
                <div className="row">
                    <div className='col-md-4'></div>
                    <div className="col-md-4">
                        <div className="login-box well">
                            <form onSubmit={this.handleSubmit}> 
                                <legend>Login</legend>
                                <div className="enter-form">
                                    <label htmlFor="userName">User Name: </label>
                                    <input id="userName" className="form-control-ligin"
                                        value={this.state.userName} onChange={this.handleUserNameChange} />
                                </div>
                                <div className="enter-form">
                                    <label htmlFor="password">Password: </label>
                                    <input id="password" type='password' className="form-control-ligin"
                                        value={this.state.password} onChange={this.handlePasswordChange} />
                                </div>
                                <button className='btn-default' type='submit'>Login</button>
                            </form>
                        </div>
                        <div id="showResponseArea" className="alert hide">
                            <span>Illegal credentials</span>
                        </div>
                    </div>
                    <div className='col-md-4'></div>
                </div>
            </div>
        );
    }
});

export default LoginUser;