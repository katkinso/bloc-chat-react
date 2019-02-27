import React, { Component } from "react";
import SendMessage from "./SendMessage";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { getTypingUsers } from './api';


import { convertDateTime } from "../utils/utils";

class Messages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      newMessage: {
        content: "",
        createdAt: "",
        roomId: "",
        username: "",
        key: ""
      },
      editedMessage: "",
      messageToEdit: {},
      textareaHeight: 100,
      typingUsers: ''
    };

    getTypingUsers((err,user) => {
      this.setState({typingUsers : user})
    })

    this.messagesRef = this.props.firebase.database().ref("messages");
  }

  componentDidMount() {

    this.messagesRef.orderByChild("key").on("child_added", snapshot => {
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat(message) });
    });

  }

  setMessage(e) {
    if (e.keyCode === 13 && e.shiftKey === false) {
      this.sendMessage(e);
      return;
    }

    this.setTextAreaHeight(e);

    const newMessage = {
      content: e.target.value,
      createdAt: "",
      roomId: this.props.activeRoom.key,
      username: this.props.userInfo.displayName,
      key: ""
    };
   
    getTypingUsers((err,user) => {
      this.setState({typingUsers : user})
    },newMessage.username)


    this.setState({ newMessage: newMessage });
  }

  sendMessage(e) {
    e.preventDefault();
    this.messagesRef
      .push({
        content: this.state.newMessage.content,
        createdAt: this.props.firebase.database.ServerValue.TIMESTAMP,
        roomId: this.state.newMessage.roomId,
        username: this.state.newMessage.username
      })
      .then(() => {
        this.setState({
          newMessage: {
            content: "",
            createdAt: "",
            roomId: "",
            username: "",
            key: ""
          },
          textareaHeight: 100
        });
      });
  }

  deleteMessage(key) {
    const filteredMessages = this.state.messages.filter(
      message => message.key !== key
    );

    this.messagesRef.child(key).remove(function(error) {
      if (error) {
        console.log(error);
        return false;
      }
    });
    this.setState({ messages: filteredMessages });
  }

  setMessageToEdit(message) {
    this.setState({ messageToEdit: message });
  }

  commitMessage(message) {
    if (!this.state.editedMessage.trim()) {
      return;
    }

    const editedMessage = {
      content: this.state.editedMessage,
      key: this.state.messageToEdit.uuid,
      createdAt: this.state.messageToEdit.createdAt,
      roomId: this.state.messageToEdit.roomId,
      username: this.state.messageToEdit.username
    };

    this.messagesRef
      .child(editedMessage.key)
      .update({ content: editedMessage.content });

    const filtered = this.state.messages.filter(
      message => message.key !== editedMessage.key
    );
    this.setState({
      messages: filtered.concat(editedMessage),
      editedMessage: "",
      messageToEdit: {},
      textareaHeight: 100
    });

  }

  handleMidEditState(message) {
    if (message.target) {
      this.setState({ editedMessage: message.target.value });
      return;
    }
    this.setState({ editedMessage: message.content });
  }

  setTextAreaHeight(e) {
    this.setState({ textareaHeight: e.target.scrollHeight });
  }

  formatMessageContent(content) {
    return content.split("\n").map((word, index) => {
      return (
        <span className="text-light" key={index}>
          {word}
          <br />
        </span>
      );
    });
  }

  render() {
    return (
      <div>
        <h1>{this.props.activeRoom.name}</h1>
        <hr className="hr-light" />
        {this.state.messages
          .filter(message => message.roomId === this.props.activeRoom.key)
          .map(message => (
            <div key={message.createdAt}>
              <div className="row">
                <div className="col-11">
                  <p>
                    <span className="text-light font-weight-bold">
                      {message.username}
                    </span>{" "}
                    <span className="text-message-time">
                      {convertDateTime(message.createdAt)}
                    </span>
                  </p>
                  {this.formatMessageContent(message.content)}
                </div>

                <div className="col-1 text-align-right">
                  <ButtonToolbar>
                    <DropdownButton
                      drop="left"
                      variant="secondary"
                      title=<i className="fas fa-ellipsis-h" />
                      id="messageMenuButton"
                      key="messageMenuButton"
                      className="message-menu"
                    >
                      <Dropdown.Item eventKey="1">
                        <DeleteModal
                          {...message}
                          uuid={message.key}
                          trigger="Delete"
                          size="lg"
                          objectType="message"
                          deleteObject={() => this.deleteMessage(message.key)}
                        />
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="2" />
                      <EditModal
                        {...message}
                        uuid={message.key}
                        key="1"
                        midEditState={this.state.editedMessage}
                        commitEdit={message => this.commitMessage(message)}
                        handleMidEditState={message =>
                          this.handleMidEditState(message)
                        }
                        setObjectToEdit={message =>
                          this.setMessageToEdit(message)
                        }
                        size="lg"
                        objectType="message"
                        trigger="Edit"
                        controlType="textarea"
                        textareaHeight={this.state.textareaHeight}
                      />
                    </DropdownButton>
                  </ButtonToolbar>
                </div>
              </div>
              <hr className="hr-light" />
            </div>
          ))}

          {this.state.typingUsers &&         
            <p className="text-message-time">{this.state.typingUsers} is typing</p>
          } 
        


        <SendMessage
          firebase={this.props.firebase}
          setMessage={e => this.setMessage(e)}
          sendMessage={e => this.sendMessage(e)}
          newMessage={this.state.newMessage.content}
          textareaHeight={this.state.textareaHeight}
        />
      </div>
    );
  }
}

export default Messages;

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
