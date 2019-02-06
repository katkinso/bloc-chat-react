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

    this.state = {
      activeRoom: {}
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

  render() {
    return (

      <div className="container-fluid h-100 pl-0">
          <ChatRoom
            firebase={firebase}
            setActiveRoom={(room) => this.setActiveRoom(room)}
            activeRoom={this.state.activeRoom}
          />
      </div>

    );
  }
}

export default App;
