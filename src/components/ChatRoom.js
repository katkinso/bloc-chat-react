import React, { Component } from "react";
import RoomList from './RoomList';
import MessageList from './MessageList';
import User from './User';


class ChatRoom extends Component {

  render(){

    return (

        <div className="d-flex flex-row h-100">
            <div className="left-nav h-100 px-3 py-3">
                <RoomList
                    firebase={this.props.firebase}
                    activeRoom={this.props.activeRoom}
                    setActiveRoom={(room) => this.props.setActiveRoom(room)} 
                    setRoomToDelete={(room) => this.props.setRoomToDelete(room)} 
                    />
            </div>
            <div className="container-fluid py-0 px-4">
                <User 
                    firebase={this.props.firebase}
                    userInfo={this.props.userInfo}
                    setUserInfo={(user) => this.props.setUserInfo(user)}
                />
                 <MessageList
                    roomToDelete={this.props.roomToDelete}
                    firebase={this.props.firebase}
                    activeRoom={this.props.activeRoom}
                    userInfo={this.props.userInfo}
                 />
              </div>
        </div>

    )
  }
}

export default ChatRoom

