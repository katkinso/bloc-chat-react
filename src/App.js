import React, { Component } from 'react';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';
import * as firebase from 'firebase';
import { firebaseConfig } from './config';
firebase.initializeApp(firebaseConfig);


class App extends Component {
  constructor(props) {
    super(props)

    this.defaultUserInfo = {
      displayName: "Guest",
      email: '',
      photoURL: "/anon-person.png",
      isLoggedIn: false
    }

    this.state = {
      activeRoom: {},
      roomToDelete: {},
      userInfo: this.defaultUserInfo
    };

    this.roomsRef = firebase.database().ref("rooms");
    this.initalizeRoom();
  }

  initalizeRoom() {
    this.roomsRef.orderByChild("order_by_name").limitToFirst(1).on("child_added", snapshot => {
      const activeRoom = snapshot.val();
      activeRoom.key = snapshot.key;
      this.setState({ activeRoom: activeRoom });
    })
  }

  setActiveRoom(room){
    this.setState({ activeRoom: room });
  }

  setRoomToDelete(room){
     this.setState({ roomToDelete : room })
  }

  setUserInfo(user) {
    user === null ? this.setState({ userInfo: this.defaultUserInfo }) : this.setState(
      {
        userInfo: {
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          isLoggedIn: true
        }
      })
  }

  render() {
    return (

      <div className="d-flex flex-row h-100">
        <div className="left-nav h-100 px-3 py-3">
          <RoomList
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            setActiveRoom={(room) => this.setActiveRoom(room)}
            setRoomToDelete={(room) => this.setRoomToDelete(room)}
          />
        </div>
        <div className="container-fluid py-0 px-1">
          <User
            firebase={firebase}
            userInfo={this.state.userInfo}
            setUserInfo={(user) => this.setUserInfo(user)}
          />
          <MessageList
            roomToDelete={this.state.roomToDelete}
            firebase={firebase}
            activeRoom={this.state.activeRoom}
            userInfo={this.state.userInfo}
          />
        </div>
      </div>

    );
  }
}

export default App;
