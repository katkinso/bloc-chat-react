import React, { Component } from "react";
import SendMessage from './SendMessage';
import { convertDateTime } from '../utils/utils'

class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: {
        content: '',
        createdAt: '',
        roomId: '',
        username: '',
        key: ''
      }
    };

    this.messagesRef = this.props.firebase.database().ref("messages")
  }

  componentDidMount() {
    
    this.messagesRef.orderByChild("key").on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;

      this.setState({ 
          messages: this.state.messages.concat(message)
          
        })
      });
  }


  setMessage(e){
    
    const newMessage = {
      content: e.target.value,
      createdAt: '',
      roomId: this.props.activeRoom.key,
      username: this.props.userInfo.displayName,
      key: ''
    }

    this.setState({  newMessage: newMessage });

  }

  sendMessage(e){
    e.preventDefault();

    this.messagesRef.push({ 
      content: this.state.newMessage.content,
      createdAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      roomId: this.state.newMessage.roomId,
      username: this.state.newMessage.username
     }).then(() => {

      this.setState({
        newMessage: {
          content: '',
          createdAt: '',
          roomId: '',
          username: '',
          key: ''
        }
      });

     })

  }


  deleteMessage(key){
    const filteredMessages = this.state.messages.filter(m => m.key !== key)
    this.messagesRef.child(key).remove(function(error){
      if (error){
        console.log(error)
        return false;
      }
    })
    this.setState({ messages : filteredMessages })
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

            <div className="row">

              <div className="col-10">
                <p className="text-light font-weight-bold">{message.username}</p>
                <p className="text-light">{message.content}</p>
              </div>
              
              <div className="col-2 text-right">
                <p className="text-message-time">{convertDateTime(message.createdAt)}&nbsp;<i className="fas fa-trash-alt nav-link" onClick={() => this.deleteMessage(message.key)}></i></p>
              </div>

              </div>
              <hr className="hr-light" />
            </div>
            
          )
          )}

          <SendMessage
              firebase={this.props.firebase}
              setMessage={(e) => this.setMessage(e)}
              sendMessage={(e) => this.sendMessage(e)}
              newMessage={this.state.newMessage.content}
            />
      </div>
    );
  }
}

export default MessageList;


//  //Note - moving logic to call db on room change
//  componentDidUpdate(prevProps, prevState) {

//   if (this.props.activeRoom.key === prevProps.activeRoom.key){
//     return;
//   }

//   const messageRef = this.props.firebase.database().ref("messages").orderByChild("roomId").equalTo(this.props.activeRoom.key);
  
//   messageRef.off("child_added")
//   this.setState({ messages: []})
  
//   messageRef.on("child_added", snapshot => {
//     const message = snapshot.val();
//     message.key = snapshot.key;
//     // message.createdAt = message.createdAt;
//     // console.log(message)
//     // this.state.createdAt
//     this.setState({ 
//         messages: this.state.messages.concat(message)
//       });
//   });
// }