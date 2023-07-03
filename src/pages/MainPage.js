import React, { useState } from "react";
import "./MainPage.css";
import Chat from "../components/Chat";
import axios from "axios";
import { resolvePath } from "react-router-dom";

const MainPage = () => {
  const [chats, setChats] = useState([
    {
      sender: "bot",
      message:
        "안녕하세요, 저는 MBTI 운세 봇 입니다. 운세와 MBTI에 대해 질문이 있으시면 언제든지 말씀해주세요. 무엇을 도와드릴까요?",
    },
  ]);
  const [message, setMessages] = useState(""); // input 입력 내용

  // textarea 값 가져오기
  const getContent = (e) => {
    const content = e.target.value;
    setMessages(content);
  };

  // 유저 메시지 인풋
  const addChat = () => {
    const userChat = {
      sender: "user",
      message: message,
    };
    setChats((prevChats) => [...prevChats, userChat]);

    axios
      .post(
        "http://localhost:3000/fortuneTell",
        {
          message: message,
        },
        { withCredentials: true }
      )
      .then(function (response) {
        console.log("성공");
        console.log(response.data.assistant);

        const botChat = {
          sender: "bot",
          message: response.data.assistant,
        };

        setChats((prevChats) => [...prevChats, botChat]);
      })
      .catch((error) => {
        console.log("실패");
      });
  };

  const addChat2 = () => {
    const newChat = {
      sender: "bot",
      message: message,
    };
    setChats([...chats, newChat]);
  };

  const test = () => {
    // setChats(...chats, content);
    console.log(chats);
  };

  return (
    <div className="MainPage">
      {chats.map((e) => (
        <div>
          <Chat isuser={e.sender} message={e.message} />
        </div>
      ))}

      <div className="Chat_Input_Container">
        <input
          type="text"
          className="user-input"
          placeholder="메시지를 입력하세요"
          onChange={getContent}
        />
        <button className="send-button" onClick={addChat}>
          유저 입력
        </button>

        <button className="send-button" onClick={addChat2}>
          봇 입력
        </button>

        <button className="send-button" onClick={test}>
          테스트
        </button>
      </div>
    </div>
  );
};

export default MainPage;
