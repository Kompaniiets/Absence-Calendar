import React from 'react';
import Actions from '../actions/Actions';
import CalendarStore from '../stores/CalendarStore';
import RadioComponent from './AbsenceDialog/RadioComponent';
import CheckboxComponent from './AbsenceDialog/CheckboxComponent';
import DateComponent from './AbsenceDialog/DateComponent';
import TimeComponent from './AbsenceDialog/TimeComponent';
import TextareaComponent from './AbsenceDialog/TextareaComponent';
import UsersList from './AbsenceDialog/UsersList';

function getState() {
    return {
        selectedOption: '',
        isCheckPhone: false,
        isCheckEmail: false,
        isCheckWork: false,
        textArea: '',
        startDate: null,
        endDate: null,
        startTime: null,
        endTime: null,
        checkedUser: 'Me'
    }
}

var ModalWindow = React.createClass({

    getInitialState: function () {
        return getState();
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
    // Check reason
    handleRadio(value) {
        this.setState({
            selectedOption: value
        });
    },
    // Date
    handleStartDate(date) {
        this.setState({
            startDate: date
        });
    },
    handleEndDate(date) {
        this.setState({
            endDate: date
        });
    },
    // Time
    handleStartTime(time) {
        this.setState({
            startTime: time
        });
    },
    handleEndTime(time) {
        this.setState({
            endTime: time
        });
    },
    // Check communication
    handlePhone(value) {
        this.setState({
            isCheckPhone: value
        });
    },
    handleEmail(value) {
        this.setState({
            isCheckEmail: value
        });
    },
    handleWork(value) {
        this.setState({
            isCheckWork: value
        });
    },
    // Text description
    handleTextArea(value) {
        this.setState({
            textArea: value
        });
    },

    handleChange(value) {
        this.setState({ checkedUser: value });
    },

    handleFormSubmit(event) {
        event.preventDefault();

        var absenceData = {
            select: this.state.selectedOption,
            checkedUser: this.state.checkedUser,
            startDate: new Date(this.state.startDate),
            endDate: new Date(this.state.endDate),
            startTime: new Date((this.state.startTime)),
            endTime: new Date((this.state.endTime)),
            txtArea: this.state.textArea
        };
        var checkList = {
            phone: this.state.isCheckPhone ? 'Phone' : null,
            email: this.state.isCheckEmail ? 'Slack/Email' : null,
            work: this.state.isCheckWork ? 'Work' : null
        };

        for (var key in checkList) {
            if (checkList[key] === null) {
                delete checkList[key];
            }
        }

        absenceData.checkList = checkList;

        if (this.state.selectedOption && this.state.startDate) {
            Actions.saveAbsence(absenceData);
        }
        else {
            alert('Please fill all data!');
        }
    },

    render() {
        return (
            <div className="modal-container">
                <button type="button" className="lt-sub-btn-md" data-toggle="modal" data-target="#myModal">New</button>

                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">

                        <form onSubmit={this.handleFormSubmit} >
                            <div className="modal-content modal-dialog-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h3 className="modal-title">New Absence</h3>
                                </div>

                                <div className="modal-body">
                                    <RadioComponent handleRadio={this.handleRadio} />
                                    <UsersList handleChange={this.handleChange} />
                                    <CheckboxComponent handlePhone={this.handlePhone} handleEmail={this.handleEmail} handleWork={this.handleWork} />
                                    <DateComponent handleStartDate={this.handleStartDate} handleEndDate={this.handleEndDate} />
                                    <TimeComponent handleStartTime={this.handleStartTime} handleEndTime={this.handleEndTime} />
                                    <TextareaComponent handleTextArea={this.handleTextArea} />
                                </div>

                                <div className="modal-footer">
                                    <button type="submit" className="lt-sub-btn-md">Ok</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
});

export default ModalWindow;