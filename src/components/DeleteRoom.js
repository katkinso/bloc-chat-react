import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class DeleteRoom extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          show: false,
        };
      }
    
      handleClose(room) {
        if (room){ this.props.deleteRoom(room) }
        this.setState({ show: false });
      }
    
      handleShow() {
          this.setState({ show: true });
      }

    
      render() {
        return (

            <div>
            
                <i className="fas fa-trash-alt" onClick={() => this.handleShow()}></i>
                

                <Modal centered show={this.state.show} onHide={() => this.handleClose()}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    Are you sure you want to delete <span className="font-weight-bold">{this.props.room.name}</span>?
                    
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.handleClose()}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => this.handleClose(this.props.room)}>
                        Yes Delete Room
                    </Button>
                    </Modal.Footer>
                </Modal>

            </div>
         
        );
      }
    }

export default DeleteRoom

// <Button variant="primary" onClick={() => this.handleShow()}>
//             Launch demo modal
//           </Button>