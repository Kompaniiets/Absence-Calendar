import React from 'react';
import Absence from './Absence';

class Day extends React.Component {
    constructor() {
        super();
    }

    render() {
        var absenceList = this.props.absences.map(function (currentAbsence, index) {
            return (
                <Absence key={index} absence={currentAbsence} />
            );
        });

        return (
            <div className={"one-day " + (this.props.isCurrentMonth ? "" : "other_month ") +
                (this.props.isToday ? "today" : "") + (this.props.isWeekend ? "weekend" : "")}>

                <span className="day-number">{this.props.date}</span>
                {absenceList}
            </div>
        );
    }
}

export default Day;