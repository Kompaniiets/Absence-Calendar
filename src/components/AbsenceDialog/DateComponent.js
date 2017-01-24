import React from "react";
import Datetime from 'react-datetime';

var DateComponent = React.createClass({
    getInitialState: function () {
        return {
            startDate: null,
            endDate: null,
            showSecondDate: false
        }
    },

    handleStartDateChange: function (date) {
        this.props.handleStartDate(this.state.startDate = date);
    },

    handleEndDateChange: function (date) {
        this.props.handleEndDate(this.state.endDate = date);
    },

    onClick: function () {
        this.setState({ showSecondDate: !this.state.showSecondDate });
    },

    render: function () {
        return (
            <div className="row modalDiv">
                <label className="col-xs-1">Date: </label>
                <div className="form-group col-xs-4">

                    <Datetime input={true} locale="us" timeFormat={false}
                        closeOnSelect={true} utc={true} dateFormat='D MMMM YYYY'
                        selected={this.state.startDate} onChange={this.handleStartDateChange}
                        />
                </div>

                <div className="form-group col-xs-4">

                    {this.state.showSecondDate ?
                        <div>
                            <Datetime input={true} locale="en" timeFormat={false}
                                closeOnSelect={true} utc={true} dateFormat='D MMMM YYYY'
                                selected={this.state.endDate} onChange={this.handleEndDateChange}
                                />
                        </div>
                        : null
                    }
                </div>
                <div className="modalDiv">
                    <input id="date-check" type="checkbox" value="hiddenDate" name="hiddenDate" onClick={this.onClick} />
                    <label htmlFor="date-check" id="dt-check">Date range</label>
                </div>
            </div>
        )
    }
})

module.exports = DateComponent;