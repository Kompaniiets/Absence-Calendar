import React from 'react';

var Month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

var DropDown = React.createClass({

    getInitialState: function () {
        return {
            monthValue: Month[new Date().getMonth()]
        }
    },
    handleOnChange: function (event) {
        this.props.handleChange(this.state.monthValue = event.target.value);
    },

    render: function () {
        var MakeItem = function (month, index) {
            return <option key={index}>{month}</option>;
        };

        return <select onChange={this.handleOnChange} value={this.state.monthValue} className="select-style">
            {Month.map(MakeItem)}
        </select>;
    }
})

module.exports = DropDown;