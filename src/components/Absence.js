import React from 'react';

class Absence extends React.Component {
    render() {
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        return (
            <div className={"absenceOnCalendar " +
                ((this.props.absence.reason == "Sick") ? "sick-style" : "") +
                ((this.props.absence.reason == "Vacation") ? "vacation-style" : '') +
                ((this.props.absence.reason == "Day off") ? "dayOff-style" : '') +
                ((this.props.absence.reason == "Work from Home") ? "workFromHome-style" : '')
            }>

                {(this.props.absence.reason == "Work from Home") ? "Home" : this.props.absence.reason}: {this.props.absence.name}

                <span className="tooltiptext">
                    {this.props.absence.reason}: {this.props.absence.name} <br />
                    {/*show first date*/}
                    {new Date(this.props.absence.startDate).getDate()} {(monthNames[new Date(this.props.absence.startDate).getMonth()])}
                    {/*show second date*/}
                    {
                        (new Date(this.props.absence.endDate).getTime() == new Date(this.props.absence.startDate).getTime())
                            ? (" " + ("0" + new Date(Date.parse(this.props.absence.startTime)).getUTCHours()).slice(-2) +
                                ":" + ("0" + new Date(Date.parse(this.props.absence.startTime)).getUTCMinutes()).slice(-2) +
                                " - " + ("0" + new Date(Date.parse(this.props.absence.endTime)).getUTCHours()).slice(-2) +
                                ":" + ("0" + new Date(Date.parse(this.props.absence.endTime)).getUTCMinutes()).slice(-2))
                            : (" - " + new Date(this.props.absence.endDate).getDate() + " " + monthNames[new Date(this.props.absence.endDate).getMonth()])
                    } <br />
                    {this.props.absence.description}
                </span>
            </div>
        );
    }
}

export default Absence;