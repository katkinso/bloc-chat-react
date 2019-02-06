import React, { Component } from "react";
import RoomList from './RoomList';
import MessageList from './MessageList';

class RoomMessages extends Component {

  render(){

    return (

        <div className="d-flex flex-row h-100">
            <div className="left-nav h-100 px-3 py-5">
                <RoomList
                    firebase={this.props.firebase}
                    activeRoom={this.props.activeRoom}
                    setActiveRoom={(room) => this.props.setActiveRoom(room)} />
            </div>
            <div className="flex-fill py-5 px-3">
                <MessageList
                    firebase={this.props.firebase}
                    activeRoom={this.props.activeRoom}
                />
            </div>
        </div>

    )
  }
}

export default RoomMessages

