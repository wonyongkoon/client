import React, { useState } from "react";
import "./MainPage.css";
const MainPage = () => {
  // 유저가 입력한 채팅과 봇이 말한 채팅을 배열에 잘 포개어 준 후 chat.js를 이용하여 표출해준다.

  const [messages, setMessages] = useState([
    {
      content: "안녕하세요! MBTI 운세를 알려드릴 챗비티아이입니다.",
      sender: "bot",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    console.log(e.preventDefault());
    if (userInput.trim() !== "") {
      addMessageToChat(userInput, "user");
      setUserInput("");
      fetchData(userInput);
    }
  };

  const addMessageToChat = (content, sender) => {
    const newMessage = {
      content,
      sender,
    };
    setMessages([...messages, newMessage]);
  };

  const fetchData = (userMessage) => {
    fetch("http://localhost:3000/fortuneTell", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMessage }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        addMessageToChat(data.assistant, "bot");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="chat-container">
      <div id="chat-messages" className="message-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === "user" ? "user-message" : "bot-message"
            }`}
          >
            <img
              src="avatar.jpeg"
              alt={message.sender}
              className="message-avatar"
            />
            <div className="message-content">{message.content}</div>
          </div>
        ))}
      </div>
      <form className="input-container" onSubmit={handleMessageSubmit}>
        <input
          type="text"
          id="user-input"
          className="user-input"
          placeholder="메시지를 입력하세요"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button type="submit" className="send-button">
          전송
        </button>
      </form>
    </div>
  );
};

export default MainPage;
