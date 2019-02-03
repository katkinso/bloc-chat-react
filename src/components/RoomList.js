import React, { Component } from "react";

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      newRoomName: ""
    };

    this.roomsRef = this.props.firebase.database().ref("rooms");
  }

  componentDidMount() {
    this.roomsRef.on("child_added", snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat(room) });
    });
  }

  handleChange(e){
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
      name: newRoomName
    }).key;

    const newRoom = {
      name: newRoomName,
      key: key
    }

    this.setState({
      rooms: this.state.rooms.concat(newRoom),
      newRoomName: ""
    })

  }

  findRoomByName(roomName){
    return this.state.rooms.find(room => roomName.toLowerCase() === room.name.toLowerCase())
  }


  render() {
    return (
      <div>
        <h1>Available Chat Rooms</h1>
        {this.state.rooms.map((room) => {
          return <p key={room.key}>{room.name}</p>;
        })}

        <form onSubmit={e => this.createRoom(e)}>

          <div className="input-group mb-3">
            <input type="text"
              className="form-control"
              placeholder="Room Name"
              aria-label="Room Name"
              aria-describedby="button-roomname"
              value={this.state.newRoomName}
              onChange={e => this.handleChange(e)}
            />
            <div className="input-group-append">
              <input className="btn btn-primary" type="submit" id="button-roomname" value="CREATE ROOM" />
            </div>
          </div>

        </form>

      </div>
    );
  }
}

export default RoomList;
