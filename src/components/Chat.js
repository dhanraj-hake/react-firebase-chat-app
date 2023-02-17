import React, { useContext } from 'react'

import VideoCallIcon from "../img/cam.png";
import AddUser from "../img/add.png";
import More from "../img/more.png";
import Messages from './Messages';
import MessageInput from './MessageInput';
import { chatContext } from '../context/chatContext';

const Chat = () => {

  const { chat } = useContext(chatContext);

  console.log(chat);

  return (
    <div className='chat'>
      <div className="chatinfo">
        <span>{chat ? chat[1].userInfo.displayName: ""}</span>
        <div className="icons">
          <img src={VideoCallIcon} alt="" />
          <img src={AddUser} alt="" />
          <img src={More} alt="" />
        </div>
      </div>

      <Messages />
      <MessageInput />

    </div>
  )
}

export default Chat
