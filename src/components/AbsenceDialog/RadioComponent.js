import React from "react";

var RadioComponent = React.createClass({
    getInitialState: function () {
        return {
            selectedOption: 'Day off'
        }
    },

    handleRadioChange(event) {
        this.props.handleRadio(this.state.selectedOption = event.target.value);
    },

    render: function () {
        return (
            <div>
                <label className="radio-btn" htmlFor="day_off">
                    <input type="radio" className="dayOff-style" name="optradio" id="day_off" value="Day off"
                        checked={this.state.selectedOption === 'Day off'}
                        onChange={this.handleRadioChange} /> Day off</label>

                <label className="radio-btn" htmlFor="vacation">
                    <input type="radio" className="vacation-style" name="optradio" id="vacation" value="Vacation"
                        checked={this.state.selectedOption === 'Vacation'}
                        onChange={this.handleRadioChange} /> Vacation</label>

                <label className="radio-btn" htmlFor="sick">
                    <input type="radio" className="sick-style" name="optradio" id="sick" value="Sick"
                        checked={this.state.selectedOption === 'Sick'}
                        onChange={this.handleRadioChange} /> Sick</label>

                <label className="radio-btn" htmlFor="work_home">
                    <input type="radio" className="workFromHome-style" name="optradio" id="work_home" value="Work from Home"
                        checked={this.state.selectedOption === 'Work from Home'}
                        onChange={this.handleRadioChange} /> Work from Home</label>
            </div>
        )
    }
})

module.exports = RadioComponent;