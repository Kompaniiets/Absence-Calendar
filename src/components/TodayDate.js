import React from 'react';

var TodayDate = React.createClass({

    render: function () {
        var todayDate = new Date(Date.now());
        var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Jctober', 'November', 'December'];
        var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return (
            <div className="todayDate">
                <h2>Today</h2>
                {week[new Date(todayDate).getDay()] + ", " + new Date(todayDate).getDate() + " of " + month[new Date(todayDate).getMonth()] + " " + new Date(todayDate).getFullYear()}
                <hr></hr>
            </div>
        );
    }
});

module.exports = TodayDate;