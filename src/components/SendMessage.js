import React, { Component } from "react";

class SendMessage extends Component {
  render() {
    return (
      <div className="container-fluid">
        <form onSubmit={e => this.props.sendMessage(e)}>
          <div className="input-group mb-3">
            <textarea
              name="comment"
              className="form-control message"
              placeholder="Message"
              aria-label="Message"
              aria-describedby="button-roomname"
              onChange={e => this.props.setMessage(e)}
              onKeyDown={e => this.props.setMessage(e)}
              value={this.props.newMessage}
              rows="3"
              style={{ height: this.props.textareaHeight }}
            />

            <div className="input-group-append">
              <input
                className="btn btn-primary"
                type="submit"
                id="button-roomname"
                value="SEND"
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default SendMessage;
