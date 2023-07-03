import React from "react";
import "./Chat.css";
import bot_img from "../images/avatar.jpeg";
const Chat = ({ isuser, message }) => {
  return (
    <div className="Chat">
      {isuser === "bot" ? (
        <div className="Chat_container BotMessage">
          <img className="Chat_GPT_img" src={bot_img} />
          <div className="Chat_chat">
            <span>{message}</span>
          </div>
        </div>
      ) : (
        <div className="Chat_container UserMessage">
          <div className="Chat_chat">
            <span>{message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
