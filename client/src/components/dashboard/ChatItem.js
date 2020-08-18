import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import io from "socket.io-client";
import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";
import TextContainer from "./TextContainer";
let socket;
const ChatItem = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState("");
  const ENDPOINT = "http://localhost:5000";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT, { origins: ENDPOINT });
    console.log(name, room);
    setName(name);
    setRoom(room);
    console.log(socket);
    socket.emit("join", { name, room }, () => {});
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);
  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
    console.log(message, messages);
  };
  return (
    <div className="outerContainer">
      <div className="containerC">
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
        {/* <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        /> */}
      </div>
      {/* <TextContainer users={users} /> */}
    </div>
  );
};

ChatItem.propTypes = {};

export default ChatItem;
