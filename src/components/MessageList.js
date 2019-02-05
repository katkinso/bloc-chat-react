import React, { Component } from "react";


class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: ""
    };

    

    this.messagesRef = this.props.firebase.database().ref("messages")

    // ****************************
    // Info and Testing *******
    // ****************************

    //ISSUE
    // I am trying to filter the call I make to firebase. It works if I manually enter the key (see below).
    // props.activeRoom.key or this.props.activeRoom key appears to be 'undefined'
    // but I am able to access in the render() method with no problem.

    // TESTING
    // console.log(props.activeRoom.key) -> undefined
    // console.log(this.props.activeRoom.key) -> undefined
    
    // WORKS -> this.messagesRef = this.props.firebase.database().ref("messages").orderByChild("roomId").equalTo('-LXq3jojCGhHtS_4BYu7')
    // DOESNT WORK -> this.messagesRef = this.props.firebase.database().ref("messages").orderByChild("roomId").equalTo(this.props.activeRoom.key)
    // DOESNT WORK -> this.messagesRef = this.props.firebase.database().ref("messages").orderByChild("roomId").equalTo(props.activeRoom.key)
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
      <p className="text-light">I AM THE ACTIVE ROOM: {this.props.activeRoom.key}</p> 

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


// componentDidMount() {
//   this.messagesRef.on("child_added", snapshot => {
//     const message = snapshot.val();
//     message.key = snapshot.key;
//     this.setState({ 
//         messages: this.state.messages.concat(message),
//       });
//   });
// }


// {this.state.messages.map((message) => {
          
//   if (message.roomId === this.props.activeRoom.key){
//    return (
//      <div key={message.key}>
//         <p className="text-light">{message.content}</p>
//         <p className="text-light">{message.username}</p>
//         <hr className="hr-light"/>
//      </div>
//      )
//    }
   

//   })}