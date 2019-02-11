import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import ChatRoom from './components/ChatRoom';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCyCnbQMzmYVTMi_94AGX87oXmepx1EWWg",
  authDomain: "bloc-chat-186a9.firebaseapp.com",
  databaseURL: "https://bloc-chat-186a9.firebaseio.com",
  projectId: "bloc-chat-186a9",
  storageBucket: "bloc-chat-186a9.appspot.com",
  messagingSenderId: "287465316758"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props){
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

  setUserInfo(user){
    user === null ? this.setState({userInfo: this.defaultUserInfo}) : this.setState(
      {userInfo: {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        isLoggedIn: true
      }}) 

  }

  render() {
    return (

      <div>
          <ChatRoom
            firebase={firebase}
            setActiveRoom={(room) => this.setActiveRoom(room)}
            setUserInfo={(user) => this.setUserInfo(user)}
            setRoomToDelete={(room) => this.setRoomToDelete(room)}
            activeRoom={this.state.activeRoom}
            roomToDelete={this.state.roomToDelete}
            userInfo={this.state.userInfo}
          />
      </div>

    );
  }
}

export default App;
