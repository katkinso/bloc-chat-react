import React, { Component } from "react";
import DeleteRoom from './DeleteRoom'
import EditRoomName from './EditRoomName'

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

  handleRoomNameChange(e){
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

  handleEditRoomName(room){
    this.setState({ editedRoomName: room.target.value });
  }

  renameRoom(e){
    e.preventDefault();

    const newRoomName = this.state.editedRoomName.trim()
    if (!newRoomName){return;}

    const newEditedRoom = {
      name: newRoomName,
      order_by_name: newRoomName.toLowerCase(),
      key: this.state.roomToEdit.key
    }

     this.roomsRef.child(newEditedRoom.key)
        .update({"name":newEditedRoom.name,
        "order_by_name":newEditedRoom.order_by_name
      })

     const filtered = this.state.rooms.filter(room => room.key !== newEditedRoom.key);
     this.setState({rooms: filtered.concat(newEditedRoom)})
  }

  deleteRoom(room){
     const newRooms = this.state.rooms.filter(r => r.key !== room.key)
    
     this.roomsRef.child(room.key).remove(function(error){
       if (error){
         console.log(error)
         return false;
       }
     })

     this.props.setActiveRoom(newRooms[0])
     this.setState({ rooms : newRooms })
  }

  findRoomByName(roomName){
    return this.state.rooms.find(room => roomName.toLowerCase() === room.name.toLowerCase())
  }


  render() {
    return (

      <div className="h-100">
        <form onSubmit={e => this.createRoom(e)}>

            <div className="input-group mb-3">
              <input type="text"
                className="form-control"
                placeholder="Room Name"
                aria-label="Room Name"
                aria-describedby="button-roomname"
                value={this.state.newRoomName}
                onChange={e => this.handleRoomNameChange(e)}
              />
              <div className="input-group-append">
                <input className="btn btn-primary" type="submit" id="button-roomname" value="NEW ROOM" />
              </div>
            </div>

        </form>

        {this.state.rooms.map((room) => {

            return (

              <div key={room.key}
               className={room.key === this.props.activeRoom.key ? "nav-link active d-flex" : "nav-link d-flex"}>
              
                <div className="flex-grow-1" onClick={() => this.props.setActiveRoom(room)}>
                  {room.name}
                </div>

                <EditRoomName
                  room={room}
                  editedRoomName={this.state.editedRoomName}
                  renameRoom={(room) => this.renameRoom(room)}
                  handleEditRoomName={(room) => this.handleEditRoomName(room)}
                  setRoomToEdit={(room) => this.setRoomToEdit(room)}
                />

                <DeleteRoom
                  room={room}
                  deleteRoom={(room) => this.deleteRoom(room)}
                  setRoomToDelete={(room) => this.props.setRoomToDelete(room)}
                />
                

              </div>

            )
        })}
       
          

      </div>
    );
  }
}

export default RoomList;
// <DeleteRoom
//             activeRoom={this.props.activeRoom.key}
//             deleteRoom={() => this.deleteRoom()}
//           />

// <div className="float-right px-3">
// <i className={room.key === this.props.activeRoom.key ? "fas fa-pencil-alt active" : "fas"}></i>
// </div>

// <i className={room.key === this.props.activeRoom.key ? "fas fa-trash-alt active" : "fas"}></i>
// <i className="fas fa-pencil-alt" onClick={() => this.setRoomToEdit(room)}></i>


