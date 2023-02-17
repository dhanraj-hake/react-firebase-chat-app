import { onSnapshot, doc } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { authContext } from '../context/authContext';
import { chatContext } from '../context/chatContext';
import { db } from '../firebase';


const Chats = () => {

  const [chats, setChats] = useState([]);

  const { authUser } = useContext(authContext);

  const { selectChat } = useContext(chatContext);
  
  
  useEffect(()=>{

    const unsub = onSnapshot(doc(db, "userChats", authUser.uid), (doc)=>{
      // console.log(Object.entries(doc.data())[0]);
      setChats(doc.data());
    })

  }, [authUser.uid])

  const handalSelectChat = (chat)=>{
    selectChat(chat);
  }

  return (
    <div className='chats'>
    {chats && Object.entries(chats).sort((a,b)=>b[1].date-a[1].date).map((chat)=>{
      return (<div className="userchat" key={chat[0]} onClick={()=>handalSelectChat(chat)}>
        <img src={chat[1].userInfo.photoURL} alt="" />
        <div className="userinfo">
          <span className='username'>{chat[1].userInfo.displayName}</span>
          <span className='lastmsg'>{chat[1]?.lastMessage}</span>
        </div>
      </div>);
    })}
    </div>
  )
}

export default Chats
