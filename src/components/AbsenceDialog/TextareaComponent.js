import React from "react";

var TextareaComponent = React.createClass({
    
    handleTextAreaChange: function (event) {
        this.props.handleTextArea(event.target.value)
    },

    render: function () {
        return (
            <div className="modalDiv">
                <label htmlFor="comment">Description: </label>
                <textarea name="textArea" id="comment" className="textArea" required
                    value={this.props.value} onChange={this.handleTextAreaChange}>
                </textarea>
            </div>
        )
    }
})

module.exports = TextareaComponent;