import React from 'react';
import CalendarStore from '../stores/CalendarStore';

function getState() {
    return {
        todayAbsences: CalendarStore.getABS()
    };
}

var TodayAbsence = React.createClass({

    getInitialState: function () {
        return {
            todayAbsences: []
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

    render: function () {

        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        var todayAbs = this.state.todayAbsences.map(function (absence, index) {
            return (
                <div key={index} className={"absenceList " +
                    ((absence.reason == "Sick") ? "sick-style" : "") +
                    ((absence.reason == "Vacation") ? "vacation-style" : '') +
                    ((absence.reason == "Day off") ? "dayOff-style" : '') +
                    ((absence.reason == "Work from Home") ? "workFromHome-style" : '')
                }>
                    <div id="leftDiv">
                        {(absence.reason == "Work from Home") ? "From Home" : absence.reason}: {absence.name} <br />
                        {/*show first date*/}
                        {new Date(absence.startDate).getDate()} {(monthNames[new Date(absence.startDate).getMonth()])}
                        {/*show second date*/}
                        {
                            (new Date(absence.endDate).getTime() == new Date(absence.startDate).getTime())
                                ? (" " + ("0" + new Date(Date.parse(absence.startTime)).getUTCHours()).slice(-2) +
                                    ":" + ("0" + new Date(Date.parse(absence.startTime)).getUTCMinutes()).slice(-2) +
                                    " - " + ("0" + new Date(Date.parse(absence.endTime)).getUTCHours()).slice(-2) +
                                    ":" + ("0" + new Date(Date.parse(absence.endTime)).getUTCMinutes()).slice(-2))
                                : (" - " + new Date(absence.endDate).getDate() + " " + monthNames[new Date(absence.endDate).getMonth()])
                        } <br />
                        {absence.description}
                    </div>
                    <div id="rightDiv">
                        <div className="checkDiv">
                            <input id="ph_check" type="checkbox" disabled="disabled" checked={(absence.communication.phone) ? true : false} />
                            <label htmlFor="ph_check">Phone</label>
                        </div>
                        <div className="checkDiv">
                            <input id="sl_em_check" type="checkbox" disabled="disabled" checked={(absence.communication.email) ? true : false} />
                            <label htmlFor="sl_em_check">Slack/Email</label>
                        </div>
                        <div className="checkDiv">
                            <input id="work_check" type="checkbox" disabled="disabled" checked={(absence.communication.work) ? true : false} />
                            <label htmlFor="work_check">Work</label>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div>
                {todayAbs}
            </div>
        );
    }
});

module.exports = TodayAbsence;