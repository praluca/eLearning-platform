import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input
            placeholder="Name"
            className="joinInput"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Course Name"
            className="joinInput mt-20"
            type="text"
            onChange={(e) => setRoom(e.target.value)}
          />
        </div>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button mt-20" type="submit">
            {" "}
            Sing In
          </button>
        </Link>
      </div>
    </div>
  );
};

Chat.propTypes = {};

export default Chat;
