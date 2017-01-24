import React from 'react';
import CalendarStore from '../../stores/CalendarStore';

function getState() {
    return {
        allUsers: CalendarStore.getUserList()
    };
}

var UsersList = React.createClass({

    getInitialState: function () {
        return {
            allUsers: [],
            value: 'Me'
        };
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

    handleOnChange: function (event) {
        this.props.handleChange(this.state.value = event.target.value);
    },

    render: function () {
        var users = this.state.allUsers.map(function (user, index) {
            return (
                <option key={index}>{user}</option>
            );
        });

        return (
            <div className="modalDiv">
                <label>Employee: </label>
                <select onChange={this.handleOnChange} value={this.state.value} className="select-style">
                    {users}
                </select>
            </div>
        );
    }
});

module.exports = UsersList;