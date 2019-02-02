import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <RoomList firebase={firebase} />
        </header>
      </div>
    );
  }
}

export default App;
