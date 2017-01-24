import React from "react";

var CheckboxComponent = React.createClass({
    getInitialState: function () {
        return {
            isCheckPhone: false,
            isCheckEmail: false,
            isCheckWork: false,
        }
    },

    handlePhoneChange: function () {
        this.props.handlePhone(this.state.isCheckPhone = !this.state.isCheckPhone)
    },

    handleEmailChange: function () {
        this.props.handleEmail(this.state.isCheckEmail = !this.state.isCheckEmail)
    },

    handleWorkChange: function () {
        this.props.handleWork(this.state.isCheckWork = !this.state.isCheckWork)
    },

    render: function () {
        return (
            <div>
                <div className="modalDiv">
                    <label htmlFor="phone_checkbox">Phone:</label>
                    <input id="phone_checkbox" type="checkbox" value="Phone" name="section"
                        checked={this.state.isCheckPhone}
                        onChange={this.handlePhoneChange} />
                </div>
                <div className="modalDiv">
                    <label htmlFor="slack_email_checkbox">Slack/Email:</label>
                    <input id="slack_email_checkbox" type="checkbox" value="Slack/Email" name="section"
                        checked={this.state.isCheckEmail}
                        onChange={this.handleEmailChange} />
                </div>
                <div className="modalDiv">
                    <label htmlFor="work_checkbox">Work:</label>
                    <input id="work_checkbox" type="checkbox" value="Work" name="section"
                        checked={this.state.isCheckWork}
                        onChange={this.handleWorkChange} />
                </div>
            </div>
        )
    }
})

module.exports = CheckboxComponent;