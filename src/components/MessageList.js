import React, { Component } from "react";


class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: ""
    };
    this.messagesRef = props.firebase.database().ref("messages")

    // ****************************
    // To Ask Mentor on Thurs
    // ****************************

    // ** ISSUE **
    // Although the app is working by filtering the data in the render() method aftre getting ALL the data from the firebase call.
    // I would PREFER TO:
    // Filter the call I make to firebase by passing props.activeRoom.key or this.props.activeRoom
    // I know the firebase call works because I can manually enter the key.
    // I know the prop is because passed because I am able to access in the render() method with no problem.

    // ** TESTING **
    // console.log(props.activeRoom.key) -> undefined
    // console.log(this.props.activeRoom.key) -> undefined
    // WORKS -> this.messagesRef = this.props.firebase.database().ref("messages").orderByChild("roomId").equalTo('-LXq3jojCGhHtS_4BYu7')
    // DOESN'T WORK -> this.messagesRef = this.props.firebase.database().ref("messages").orderByChild("roomId").equalTo(this.props.activeRoom.key)
    // DOESN'T WORK -> this.messagesRef = this.props.firebase.database().ref("messages").orderByChild("roomId").equalTo(props.activeRoom.key)

    // ****************************

  }


  componentDidMount() {

    this.messagesRef.on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ 
          messages: this.state.messages.concat(message)
        });
    });
  }


  render() {
    
    return (

      <div>

        <h1>{this.props.activeRoom.name}</h1>
        <hr className="hr-light" />

        {this.state.messages.filter(message => (
          message.roomId === this.props.activeRoom.key
        )).map(message => (
          <div key={message.key}>
            <p className="text-light">{message.content}</p>
            <p className="text-light">{message.username}</p>
            <hr className="hr-light" />
          </div>
        )
        )}
      </div>
    );
  }
}

export default MessageList;
