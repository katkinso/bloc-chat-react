import React, { Component } from "react";
import DeleteRoom from './DeleteRoom'

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: "",
      deletedRoom: ""
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

  deleteRoom(room){
    const newRooms = this.state.rooms.filter(r => r.key !== room.key)
    
     this.roomsRef.child(room.key).remove(function(error){
       if (error){
         console.log(error)
         return false;
       }
     })

     this.props.setActiveRoom(newRooms[0]) //RESET ACTIVE ROOM - not working to rerender room list.
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
              <div 
                onClick={() => this.props.setActiveRoom(room)}
                key={room.key} 
                className={room.key === this.props.activeRoom.key ? "nav-link active" : "nav-link"}>
                {room.name}
                <div className="float-right">
                
                    <DeleteRoom
                      room={room}
                      deleteRoom={(room) => this.deleteRoom(room)}
                      setRoomToDelete={(room) => this.props.setRoomToDelete(room)}
                    />
                    
                </div>
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
