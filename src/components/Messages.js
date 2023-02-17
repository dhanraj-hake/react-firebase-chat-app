import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { chatContext } from '../context/chatContext'
import { db } from '../firebase';
import Message from './Message'

const Messages = () => {

  const [messages, setMessages] = useState([]);

  const { chat } = useContext(chatContext);

  useEffect(()=>{
    const getMessages = ()=>{

      const unsub = onSnapshot(doc(db, "chats", chat[0]), (doc)=>{
        setMessages(doc.data().messages);
      });
    }

    chat && getMessages();
  }, [chat]);

  return (
    <div className='messages'>
      {chat ? messages.map((message, index)=>{
        return <Message message={message} key={index} />
      }) : <div className="center">
      <span className='select-chat-msg'>Select Conversation to Chat</span>
    </div>}
  
    </div>
  )
}

export default Messages
