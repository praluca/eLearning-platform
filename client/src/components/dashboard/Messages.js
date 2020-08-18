import React from "react";
import PropTypes from "prop-types";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";
const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

Messages.propTypes = {};

export default Messages;
