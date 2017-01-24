import dispatcher from '../dispatcher/dispatcher.js';
import Actions from '../actions/Actions';
import BaseStore from './BaseStore.js';

class CalendarStore extends BaseStore {
    constructor() {
        super();
        this.state = {
            absenceList: [],
            todayAbsence: [],
            takeCurrentMonth: null,
            takeCurrentYear: null,
            usersList: [],
            isAdmin: false
        }
    }

    getAll() {
        return this.absenceList;
    }

    getABS() {
        return this.todayAbsence;
    }

    getUserList() {
        return this.usersList;
    }

    getIsAdmin() {
        return this.isAdmin;
    }

    onAction(action, payload) {
        switch (action) {
            case Actions.saveAbsence: {
                this.saveModalData(payload);
            }
            case Actions.updateAbsence: {
                this.loadAbsencesFromServer();
            }
            default:
                return true;
        }
    }

    saveModalData(absenceData) {
        $.ajax({
            type: 'POST',
            url: '/api/calendar',
            data: {
                reason: absenceData.select,
                absenceUser: absenceData.checkedUser,
                communication: absenceData.checkList,
                startDate: absenceData.startDate,
                endDate: absenceData.endDate,
                startTime: absenceData.startTime,
                endTime: absenceData.endTime,
                description: absenceData.txtArea
            }
        })
            .done((data) => {
                window.location.href = "/calendar";
            })
            .fail(function (jqXHR) {
                if (jqXHR.status === 500) {
                    console.log("status 500");
                } else {
                    console.log("Uncaught Error");
                }
            });
    }

    loadAbsencesFromServer() {
        var _that = this;
        $.ajax({
            url: '/api/calendar',
            type: 'GET',
            data: {},
            cache: false,
            success: function (data) {
                this.isAdmin = data.isAdmin;
                this.usersList = data.usersList;
                this.absenceList = this.getAbsenceForMonth(data.absenceList);
                this.todayAbsence = this.getTodayAbsence(data.absenceList);
                _that.emitChange();
            }.bind(this),
            error: function (xhr, status, err) {
            }.bind(this)
        });
    }

    saveNewUser(addUser) {
        $.ajax({
            type: 'POST',
            url: '/add-user',
            data: {
                fullName: addUser.fullName,
                login: addUser.login,
                uid: addUser.uid,
                email: addUser.email,
                password: addUser.password
            }
        })
            .done((data) => {
                window.location.href = "/calendar";
            })
            .fail(function (jqXHR) {
                if (jqXHR.status === 409) {
                    $("#showResponseArea").removeClass("hide");
                    $("#showResponseArea").addClass("alert-danger");
                } else {
                    console.log("Uncaught Error");
                }
            });
    }

    getWeekend(currentYear, currentMonth, day) {
        var isWeekend = (new Date(currentYear, currentMonth, day).getDay() == 0 || new Date(currentYear, currentMonth, day).getDay() == 6) ? true : false;
        return isWeekend;
    }

    getDays(checkedYear, checkedMonth) {
        var days = [];

        this.takeCurrentYear = checkedYear;
        this.takeCurrentMonth = checkedMonth;

        var firstDay = (this.getFirstDayOfMonth(checkedYear, checkedMonth).getDate() - this.getFirstDayOfMonth(checkedYear, checkedMonth).getDay()) + 1;
        var lastDay = ((this.getLastDayOfMonth(checkedYear, checkedMonth).getDate() - this.getLastDayOfMonth(checkedYear, checkedMonth).getDay() + 1) + 6);

        if (firstDay == 2) {
            firstDay -= 7;
        }

        var lastDayOfCurrentMonth = new Date(checkedYear, checkedMonth + 1, 0).getDate();

        for (var i = firstDay; i <= lastDay; i++) {
            var currentMonth = (i > 0 && i <= lastDayOfCurrentMonth);
            var today = (i == new Date(Date.now()).getDate() && new Date(Date.now()).getFullYear() == checkedYear && new Date(Date.now()).getMonth() == checkedMonth);
            var weekend = this.getWeekend(checkedYear, checkedMonth, i);
            days.push({
                date: new Date(checkedYear, checkedMonth, i).getTime(),
                isCurrentMonth: currentMonth,
                isToday: today,
                isWeekend: weekend
            });
        }
        return days;
    }

    getFirstDayOfMonth(year, month) {
        var firstDayOfMonth = new Date(year, month, 1);
        return firstDayOfMonth;
    }

    getLastDayOfMonth(year, month) {
        var lastDayOfMonth = new Date(year, month + 1, 0);
        return lastDayOfMonth;
    }

    fillObj(days) {
        var allAbsence = {};

        days.forEach(function (day) {
            allAbsence[day.date] = [];
        });

        return allAbsence;
    }

    getAbsenceForMonth(data) {
        var absenceForMonth = this.fillObj(this.getDays(this.takeCurrentYear, this.takeCurrentMonth));

        for (var i = 0; i < data.length; i++) {
            var startDate = data[i].startDate;
            var endDate = data[i].endDate;

            var oneDate = this.getDateWithoutTimeZone(startDate);

            if (new Date(endDate).getTime() == new Date('1970-01-01').getTime() || new Date(startDate).getTime() == new Date(endDate).getTime()) {
                if (absenceForMonth[oneDate]) {
                    absenceForMonth[oneDate].push(data[i]);
                }
            }
            else {
                var firstAndSecondDate = this.rangeOfDate(startDate, endDate);

                for (var j = 0; j < firstAndSecondDate.length; j++) {
                    if (absenceForMonth[firstAndSecondDate[j]]) {
                        absenceForMonth[firstAndSecondDate[j]].push(data[i]);
                    }
                }
            }
        }
        return absenceForMonth;
    }

    rangeOfDate(firstDate, secondDate) {
        var dateRange = [];
        var start = this.getDateWithoutTimeZone(firstDate);

        while (start <= new Date(secondDate).getTime()) {
            dateRange.push(
                start
            );
            start += 24 * 60 * 60 * 1000;
        }
        return dateRange;
    }

    getTodayAbsence(absence) {
        var getAbsenceForToday = [];
        var currentDate = this.getDateWithoutTimeZone(new Date(Date.now()));

        for (var i = 0; i < absence.length; i++) {
            for (var j = new Date(this.getDateWithoutTimeZone(absence[i].startDate)).getTime(); j <= new Date(this.getDateWithoutTimeZone(absence[i].endDate)).getTime(); j += 24 * 60 * 60 * 1000) {

                if (currentDate == j) {
                    getAbsenceForToday.push(
                        absence[i]
                    );
                }
            }
        }
        return getAbsenceForToday;
    }

    getDateWithoutTimeZone(date) {
        var day = new Date(Date.parse(date)).getDate();
        var month = new Date(Date.parse(date)).getMonth();
        var year = new Date(Date.parse(date)).getFullYear();

        var onlyDate = new Date(year, month, day).getTime();

        return onlyDate;
    }
}

export default new CalendarStore;