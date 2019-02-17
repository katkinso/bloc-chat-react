import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class EditModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  handleClose(commit) {
    this.setState({ show: false });
    if (commit) {
      this.props.commitEdit();
    }
  }

  handleShow(object) {
    this.setState({ show: true });
    this.props.setObjectToEdit(object);
    this.props.handleMidEditState(object);
  }

  render() {
    const {
      size = "lg",
      objectType = "",
      trigger = "",
      midEditState = "",
      handleMidEditState = "",
      controlType = "text",
      textareaHeight = ""
    } = this.props;

    return (
      <div className="menu-fix-it">
        <div className="w-100" onClick={() => this.handleShow(this.props)}>
          {trigger}
        </div>

        <Modal
          size={size}
          centered
          show={this.state.show}
          onHide={() => this.handleClose()}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="text-capitalize">Edit {objectType}</span>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="card">
              <div className="card-body">
                <div className="card-text form-group">
                  {controlType === "text" ? (
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      aria-label=""
                      onChange={e => handleMidEditState(e)}
                      value={midEditState}
                      id={objectType}
                    />
                  ) : (
                    <textarea
                      name="comment"
                      className="form-control"
                      placeholder=""
                      aria-label=""
                      aria-describedby="button-roomname"
                      onChange={e => handleMidEditState(e)}
                      value={midEditState}
                      id={objectType}
                      rows="5"
                      style={{ height: textareaHeight }}
                    />
                  )}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose()}>
              Cancel
            </Button>
            <Button
              variant="primary"
              type="button"
              onClick={() => this.handleClose(true)}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default EditModal;
