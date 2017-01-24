import React from 'react';
import Actions from '../actions/Actions';
import Day from './Day';
import CalendarStore from '../stores/CalendarStore';

function getState() {
    return {
        absencesForMonth: CalendarStore.getAll()
    };
}

var Month = React.createClass({

    getInitialState: function () {
        return {
            absencesForMonth: {}
        };
    },

    componentDidMount: function () {
        Actions.updateAbsence();
        CalendarStore.addChangeListener(this._onChange);
    },

    componentWillReceiveProps: function (newProps) {
        if (newProps.checkedYear !== this.props.checkedYear || newProps.checkedMonth != this.props.checkedMonth) {
            Actions.updateAbsence();
        }
    },

    componentWillUnmount: function () {
        CalendarStore.removeChangeListener(this._onChange);
    },

    _onChange: function () {
        this.setState(getState());
    },

    render: function () {
        var _this = this;
        var days = CalendarStore.getDays(this.props.checkedYear, this.props.checkedMonth).map(function (day, index) {
            return (
                <Day key={index} date={new Date(day.date).getDate()} isToday={day.isToday}
                    isCurrentMonth={day.isCurrentMonth}
                    isWeekend={day.isWeekend}
                    absences={_this.state.absencesForMonth[day.date] ? _this.state.absencesForMonth[day.date] : []} />
            );
        });

        return (
            <div>
                {days}
            </div>
        );
    }
});

module.exports = Month;