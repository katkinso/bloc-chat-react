import React, { Component } from "react";
import EditModal from './EditModal'
import CreateRoom from './CreateRoom'
import DeleteModal from './DeleteModal';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: "",
      deletedRoom: "",
      editedRoomName: "",
      roomToEdit: {}
    };

    this.roomsRef = props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.orderByChild("order_by_name").on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
    
  }

  handleRoomNameCreate(e){
    const newRoomName = e.target.value;
    this.setState({newRoomName:newRoomName})
  }

  createRoom(e) {
    e.preventDefault();
    const newRoomName = this.state.newRoomName.trim()

    if ((!newRoomName) || this.findRoomByName(newRoomName)) {
      return;
    }

    const key = this.roomsRef.push({
      name: newRoomName,
      order_by_name: newRoomName.toLowerCase()
    }).key;

    const newRoom = {
      name: newRoomName,
      order_by_name: newRoomName.toLowerCase(),
      key: key
    }

    this.setState({
      rooms: this.state.rooms.concat(newRoom),
      newRoomName: ""
    })

  }

  setRoomToEdit(room){
     this.setState({ roomToEdit: room })
  }

  handleMidEditRoomName(room){

    if (room.target){
      this.setState({ editedRoomName: room.target.value });
      return;
    }
    this.setState({ editedRoomName: room.name });
  }

  renameRoom(){
    if (!this.state.editedRoomName.trim()){return;}

    const editedRoom = {
      name: this.state.editedRoomName.trim(),
      order_by_name: this.state.editedRoomName.toLowerCase().trim(),
      key: this.state.roomToEdit.uuid
    }

     this.roomsRef.child(editedRoom.key)
        .update({"name":editedRoom.name,
        "order_by_name":editedRoom.order_by_name
      })

     const filtered = this.state.rooms.filter(room => room.key !== editedRoom.key);
     this.setState({
       rooms: filtered.concat(editedRoom),
       editedRoomName: "",
       roomToEdit: {}
    })
  }


  //talk to mentor about promises. This succeeds in testing.
  deleteRoom(key) {
    const newRooms = this.state.rooms.filter(rooms => rooms.key !== key)
    this.roomsRef.child(key).remove(function (error) {
      if (error) {
        console.log(error + "This Failed")
      }
    }).then(() => { 
      this.props.setActiveRoom(newRooms[0]) 
    }).then(() => {
      this.setState({ rooms: newRooms })
    })

  }

  findRoomByName(roomName){
    return this.state.rooms.find(
      room => roomName.toLowerCase() === room.name.toLowerCase()
    );
  }


  render() {
    return (

      <div className="h-100">

        <CreateRoom
          newRoomName={this.state.newRoomName}
          createRoom={e => this.createRoom(e)}
          handleRoomNameCreate={e => this.handleRoomNameCreate(e)}
        />

        {this.state.rooms.map((room) => {
         
          return (
            <div
              key={room.key}
              className={
                room.key === this.props.activeRoom.key
                  ? "nav-link active d-flex"
                  : "nav-link d-flex"
              }
              >
                <div className="flex-grow-1" onClick={() => this.props.setActiveRoom(room)} >
                  {room.name}
                </div>

                <ButtonToolbar>
                  <DropdownButton
                    drop="right"
                    variant="secondary"
                    title=<i className="fas fa-ellipsis-h"></i>
                    id="messageMenuButton"
                    key="messageMenuButton"
                    className="message-menu room-menu"
                  >
                    <Dropdown.Item eventKey="1"></Dropdown.Item>

                    <EditModal
                      {...room}
                      uuid={room.key}
                      key="1"
                      setObjectToEdit={room => this.setRoomToEdit(room)}
                      midEditState={this.state.editedRoomName}
                      handleMidEditState={room => this.handleMidEditRoomName(room)}
                      commitEdit={room => this.renameRoom(room)}
                      size="lg"
                      objectType="room"
                      trigger="Edit"
                    />

                    <Dropdown.Item eventKey="2">
                      <DeleteModal
                        {...room}
                        uuid={room.key}
                        key="2"
                        trigger="Delete"
                        size="lg"
                        objectType="room"
                        deleteObject={() => this.deleteRoom(room.key)}
                      />
                    </Dropdown.Item>
                    
                  </DropdownButton>
              </ButtonToolbar>     
                    
            </div>
          );
        })}

      </div>
    );
  }
}

export default RoomList;

// <DeleteRoom
// room={room}
// deleteRoom={room => this.deleteRoom(room)}
// setRoomToDelete={room => this.props.setRoomToDelete(room)}
// />
// </div>

// <EditRoomName
// room={room}
// editedRoomName={this.state.editedRoomName}
// renameRoom={room => this.renameRoom(room)}
// handleEditRoomName={room => this.handleEditRoomName(room)}
// setRoomToEdit={room => this.setRoomToEdit(room)}
// />



// <EditRoomName
// {...room}
// uuid={room.key}
// key="1"
// editedState={this.state.editedRoomName}
// commitEdit={room => this.renameRoom(room)}
// handleEditedState={room => this.handleEditRoomName(room)}
// setObjectToEdit={room => this.setRoomToEdit(room)}
// size="lg"
// objectType="room"
// trigger="Edit"
// />

// <DeleteModal
// {...room}
// uuid={room.key}
// key="2"
// trigger=<i className="fas fa-trash-alt"></i>
// size="lg"
// objectType="room"
// deleteObject={() => this.deleteRoom(room.key)}
// />