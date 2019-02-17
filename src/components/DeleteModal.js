import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { convertDateTime } from "../utils/utils";

class DeleteModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    };
  }

  handleClose(uuid) {
    if (uuid) {
      this.props.deleteObject(uuid);
    }
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const {
      name = "",
      content = "",
      createdAt = "",
      username = "",
      size = "lg",
      trigger = "Delete",
      objectType = "",
      uuid = ""
    } = this.props;
    const formattedDate = createdAt ? convertDateTime(createdAt) : "";

    return (
      <div>
        <div className="w-100" onClick={() => this.handleShow()}>
          {trigger}
        </div>

        <Modal
          size={size}
          centered
          show={this.state.show}
          onHide={() => this.handleClose()}
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Are you sure you want to delete this {objectType}? This cannot be
              undone.
            </p>

            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{username}</h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  {formattedDate}
                </h6>
                <p className="card-text">{content || name}</p>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose()}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => this.handleClose(uuid)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default DeleteModal;
