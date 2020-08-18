import React from "react";
import PropTypes from "prop-types";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <form className="formI">
      <input
        className="inputI"
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
      />
      <button className="sendButtonI" onClick={(e) => sendMessage(e)}>
        {" "}
        Send{" "}
      </button>
    </form>
  );
};

Input.propTypes = {};

export default Input;
