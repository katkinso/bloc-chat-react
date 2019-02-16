import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class EditModal extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          show: false
        };
      }
    
      handleClose(commit) {
        this.setState({ show: false });
        if (commit){ this.props.commitEdit()}
      }
    
      handleShow(object) {
        this.setState({ show: true });
        this.props.setObjectToEdit(object)
        this.props.handleMidEditState(object)
      }



      render() {

        const { size="lg", objectType="", trigger="", name="", midEditState="", handleMidEditState="", content="", controlType="text", textareaHeight=""} = this.props;

        return (

                <div className="menu-fix-it">
                    
                    <div className="w-100" onClick={() => this.handleShow(this.props)}>{trigger}</div>
     
                    <Modal size={size} centered show={this.state.show} onHide={() => this.handleClose()}>
                        <Modal.Header closeButton>
                            <Modal.Title><span className="text-capitalize">Edit {objectType}</span></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                        <div className="card">
                            <div className="card-body">

                                <div className="card-text form-group">

                                    {controlType === 'text' ? (
                                    <input type="text"
                                        className="form-control"
                                        placeholder=""
                                        aria-label=""
                                        onChange={e => handleMidEditState(e)}
                                        value={midEditState}
                                        id={objectType}
                                    />
                                    ):(
                                        <textarea name="comment"
                                        className="form-control"
                                        placeholder=""
                                        aria-label=""
                                        aria-describedby="button-roomname"
                                        onChange={e => handleMidEditState(e)}
                                        value={midEditState}
                                        id={objectType}
                                        rows="5"
                                        style={{height:textareaHeight}}
                                        ></textarea>
                                    )}
                                </div>
                                
                            </div>
                        </div>
    
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.handleClose()}>Cancel</Button>
                            <Button variant="primary" type="button" onClick={() => this.handleClose(true)}>Submit</Button>
                        </Modal.Footer>
                    </Modal>
    
                </div>

         
        );
      }
    }

export default EditModal



// <i className="fas fa-pencil-alt" onClick={() => this.handleShow(this.props)}></i>




// <div className="px-2">
// <i className="fas fa-pencil-alt" onClick={() => this.handleShow(this.props)}></i>

//  <Modal centered size={size} show={this.state.show} onHide={() => this.handleClose()}>
//      <form onSubmit={e => this.props.update(e)}>
//          <Modal.Header closeButton>
//              <Modal.Title>Edit Room Name: {name}</Modal.Title>
//          </Modal.Header>
//          <Modal.Body>

//              <div className="form-group">
//                  <input type="text"
//                  className="form-control"
//                  placeholder="New Name"
//                  aria-label="New Name"
//                  aria-describedby="button-roomname"
//                  onChange={e => this.props.handleEditedState(e)}
//                  value={editedState}
//                  id="Room"
//                  />
//              </div>

//          </Modal.Body>
//          <Modal.Footer>
//              <Button variant="secondary" onClick={() => this.handleClose()}>Cancel</Button>
//              <Button variant="primary" type="submit" onClick={() => this.handleClose()}> Rename</Button>
//          </Modal.Footer>
//      </form>
//  </Modal>
 
// </div>



// <div>
// <div className="w-100" onClick={() => this.handleShow(this.props)}>{trigger}</div>

// <Modal size={size} centered show={this.state.show} onHide={() => this.handleClose()}>
// <form onSubmit={e => this.props.update(e)}>
//     <Modal.Header closeButton>
//         <Modal.Title>Edit</Modal.Title>
//     </Modal.Header>
//     <Modal.Body>

//         <div className="card">
//             <div className="card-body">
//                 <h5 className="card-title">Edit {name}</h5>
//                 <div className="card-text form-group">
//                 <input type="text"
//                 className="form-control"
//                 placeholder="New Name"
//                 aria-label="New Name"
//                 aria-describedby="button-roomname"
//                 onChange={e => this.props.handleEditedState(e)}
//                 value={editedState}
//                 id="Room"
//                 />
//             </div>
                
//             </div>
//         </div>

//     </Modal.Body>
//     <Modal.Footer>
//         <Button variant="secondary" onClick={() => this.handleClose()}>Cancel</Button>
//         <Button variant="danger" onClick={() => this.handleClose()}>Rename</Button>
//     </Modal.Footer>
//     </form>
// </Modal>

// </div>