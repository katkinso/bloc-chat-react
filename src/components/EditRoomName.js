import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class EditRoomName extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          show: false
        };
      }
    
      handleClose(room) {
        this.setState({ show: false });
      }
    
      handleShow(room) {
          this.setState({ show: true });
          this.props.setRoomToEdit(room)
      }

      render() {
        return (

            <div className="px-2">
               <i className="fas fa-pencil-alt" onClick={() => this.handleShow(this.props.room)}></i>

                <Modal centered show={this.state.show} onHide={() => this.handleClose()}>
                    <form onSubmit={e => this.props.renameRoom(e)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Room Name: {this.props.room.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <div className="form-group">
                                <input type="text"
                                className="form-control"
                                placeholder="New Name"
                                aria-label="New Name"
                                aria-describedby="button-roomname"
                                onChange={e => this.props.handleEditRoomName(e)}
                                value={this.props.editedRoomName}
                                id="Room"
                                />
                            </div>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleClose()}>Cancel</Button>
                            <Button variant="primary" type="submit" onClick={() => this.handleClose()}> Rename Room</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                
            </div>
         
        );
      }
    }

export default EditRoomName
