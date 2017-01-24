import React from 'react';
import CalendarStore from '../../stores/CalendarStore';

function getState() {
    return {
        isAdmin: CalendarStore.getIsAdmin(),
        fullName: '',
        login: '',
        uid: 'user',
        email: '',
        password: ''
    };
}

var AddNewUser = React.createClass({
    getInitialState: function () {
        return {
            isAdmin: null
        }
    },

    componentDidMount: function () {
        CalendarStore.addChangeListener(this.onChange);
    },

    componentWillUnmount: function () {
        CalendarStore.removeChangeListener(this.onChange);
    },

    onChange: function () {
        this.setState(getState());
    },

    handleFullNameChange(event) {
        this.setState({
            fullName: event.target.value
        });
    },
    handleLoginChange(event) {
        this.setState({
            login: event.target.value
        });
    },

    handleUidChange(event) {
        this.setState({
            uid: event.target.value
        });
    },
    handleEmailChange(event) {
        this.setState({
            email: event.target.value
        });
    },

    handlePasswordChange(event) {
        this.setState({
            password: event.target.value
        });
    },

    handleFormSubmit: function (event) {
        event.preventDefault();

        var addUser = {
            fullName: this.state.fullName,
            login: this.state.login,
            uid: this.state.uid,
            email: this.state.email,
            password: this.state.password
        }

        if (addUser.fullName && addUser.login) {
            CalendarStore.saveNewUser(addUser);
        }
        else {
            alert('Please, enter correct value!');
        }
    },

    modalAddUser: function () {
        return (
            <div className="modal-container">
                <button type="button" className="lt-sub-btn-md" data-toggle="modal" data-target="#myModal_2">Add User</button>

                <div className="modal fade" id="myModal_2" role="dialog">
                    <div className="modal-dialog modal-sm">

                        <form onSubmit={this.handleFormSubmit} >
                            <div className="modal-content add-dialog-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h3 className="modal-title">Add New User</h3>
                                </div>

                                <div className="modal-body addClass">
                                    <div className="addUser">
                                        <label htmlFor="fullName">Full Name: </label>
                                        <input type="text" className="addForm-input" id="fullName" required
                                            value={this.state.fullName} onChange={this.handleFullNameChange} />
                                    </div>
                                    <div className="addUser">
                                        <label htmlFor="login">Login: </label>
                                        <input type="text" className="addForm-input" id="login" required
                                            value={this.state.login} onChange={this.handleLoginChange} />
                                    </div>
                                    <div className="addUser">
                                        <label htmlFor="uid">Role: </label>
                                        <select className="addForm-input" onChange={this.handleUidChange} value={this.state.uid}>
                                            <option value="user">user</option>
                                            <option value="admin">admin</option>
                                        </select>
                                    </div>
                                    <div className="addUser">
                                        <label htmlFor="mail">Mail: </label>
                                        <input type="text" type='email' className="addForm-input" id="mail" required
                                            value={this.state.email} onChange={this.handleEmailChange} />
                                    </div>
                                    <div className="addUser">
                                        <label htmlFor="password">Password: </label>
                                        <input type="text" type='password' className="addForm-input" id="password" required
                                            value={this.state.password} onChange={this.handlePasswordChange} />
                                    </div>
                                    <div className="addUser">
                                        <span>{'cn=' + this.state.fullName + ', ' + 'ou=users' + ', ' + 'dn=mojo'}</span>
                                    </div>
                                </div>

                                <div className="modal-footer">
                                    <button type="submit" className="lt-sub-btn-md">Save</button>
                                </div>
                            </div>
                            <div id="showResponseArea" className="alert hide">
                                <span>User already exist.</span>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    },

    render: function () {
        var modal = (this.state.isAdmin) ? this.modalAddUser() : '';
        return (
            <div>{modal}</div>
        );
    }
})

module.exports = AddNewUser;