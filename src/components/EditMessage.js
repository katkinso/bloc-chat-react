import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class EditMessage extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          show: false
        };
      }
    
      handleClose(message) {
        this.setState({ show: false });
      }
    
      handleShow(message) {
          this.setState({ show: true });
          this.props.setMessageToEdit(message)
      }

      render() {
        return (

            <div>
               <span onClick={() => this.handleShow(this.props.message)}>Edit Message</span>

                <Modal centered show={this.state.show} onHide={() => this.handleClose()}>
                    <form onSubmit={e => this.props.editMessage(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Message</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <div className="form-group">
                                <input type="text"
                                className="form-control"
                                placeholder="New Name"
                                aria-label="New Name"
                                aria-describedby="button-roomname"
                                onChange={e => this.props.handleEditMessage(e)}
                                value={this.props.editedMessage}
                                id="Room"
                                />
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleClose()}>Cancel</Button>
                            <Button variant="primary" type="submit" onClick={() => this.handleClose()}>Save</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                
            </div>
         
        );
      }
    }

export default EditMessage
