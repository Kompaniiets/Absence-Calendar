import React from 'react';

var DropDownYear = React.createClass({

    getInitialState: function () {
        return {
            yearValue: new Date().getFullYear()
        }
    },
    handleOnChange: function (event) {
        this.props.handleChange(this.state.yearValue = event.target.value);
    },

    render: function () {
        return (
            <select onChange={this.handleOnChange} value={this.state.yearValue} className="select-style">
                <option value="2016">2016</option>
                <option value="2017">2017</option>
                <option value="2018">2018</option>
                <option value="2019">2019</option>
                <option value="2020">2020</option>
                <option value="2021">2021</option>
            </select>
        )
    }
})

module.exports = DropDownYear;