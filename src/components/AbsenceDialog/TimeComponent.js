import React from "react";
import Datetime from 'react-datetime';

var TimeComponent = React.createClass({
    getInitialState: function () {
        return {
            startTime: null,
            endTime: null,
            showTime: false
        }
    },

    handleStartTimeChange: function (time) {
        this.props.handleStartTime(this.state.startTime = time);
    },

    handleEndTimeChange: function (time) {
        this.props.handleEndTime(this.state.endTime = time);
    },

    onClick: function () {
        this.setState({ showTime: !this.state.showTime });
    },

    render: function () {
        return (
            <div className="row modalDiv">

                <label className="col-xs-1">Time: </label>
                <div className="form-group col-xs-2">
                    {this.state.showTime ?
                        <div>
                            <Datetime input={true} locale="ru" dateFormat={false}
                                timeFormat={true} closeOnSelect={true} utc={true}
                                selected={this.state.startTime} onChange={this.handleStartTimeChange}
                                />
                        </div> 
                        : null
                    }
                </div>

                <div className="form-group col-xs-2">
                    {this.state.showTime ?
                        <div>
                            <Datetime input={true} locale="ru" dateFormat={false}
                                timeFormat={true} closeOnSelect={true} utc={true}
                                selected={this.state.endTime} onChange={this.handleEndTimeChange}
                                />
                        </div>
                        : null
                    }
                </div>
                <div className="modalDiv">
                    <input id="time-check" type="checkbox" value="hiddenTime" name="hiddenTime" onClick={this.onClick} />
                    <label htmlFor="time-check" id="dt-check">Partial</label>
                </div>
            </div>
        )
    }
})

module.exports = TimeComponent;