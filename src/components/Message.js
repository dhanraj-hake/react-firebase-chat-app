import React, { useContext } from 'react'
import { authContext } from '../context/authContext';
import { chatContext } from '../context/chatContext';

import { format } from 'timeago.js';

const Message = (props) => {

  const { authUser } = useContext(authContext);

  const { chat } = useContext(chatContext);

  console.log(props.message)


  return (
    <div className={`message ${props.message.senderId === authUser.uid ? 'owner' : ''}`}>
        <div className="userinfo">
            <img src={props.message.senderId === authUser.uid ? authUser.photoURL: chat[1].userInfo.photoURL} alt="" />
            <div style={{width:"50px", fontSize: "11px"}}>{format(props.message.date)}</div>
           
        </div>
        <div className="message-content">

            {props.message?.text !== "" && <p>{props.message?.text }</p>}
            <img src={props.message?.img} alt="" />
        </div>
      
    </div>
  )
}

export default Message
