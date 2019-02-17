import React from "react";

const CreateRoom = props => {
  return (
    <div>
      <form onSubmit={e => props.createRoom(e)}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Room Name"
            aria-label="Room Name"
            aria-describedby="button-roomname"
            value={props.newRoomName}
            onChange={e => props.handleRoomNameCreate(e)}
          />
          <div className="input-group-append">
            <input
              className="btn btn-primary"
              type="submit"
              id="button-roomname"
              value="NEW ROOM"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateRoom;
