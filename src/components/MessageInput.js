import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useRef, useState } from 'react'
import { authContext } from '../context/authContext';
import { chatContext } from '../context/chatContext';
import { db } from '../firebase';

import { v4 as uuid } from "uuid";

import AddImage from "../img/img.png";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { storage } from '../firebase';


const MessageInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const imageRef = useRef(null);

  const { authUser } = useContext(authContext);
  const { chat } = useContext(chatContext);

  const handalImageChange = (event) => {
    setImg(event.target.files[0]);
    console.log(event.target.files[0])
  }
  const handalTextChange = (event) => {
    setText(event.target.value);
  }

  const handalSendMessage = async () => {

    if (img) {

      try {
        const storageRef = ref(storage, uuid());

        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on('state_changed',
          (snapshot) => {

          },
          (error) => {
            console.log("Error in chat image ", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

              console.log(downloadURL)
              await updateDoc(doc(db, "chats", chat[0]), {
                messages: arrayUnion({
                  id: uuid(),
                  text: text,
                  senderId: authUser.uid,
                  date: Date.now(),
                  img: downloadURL
                })
              })

            });
          }
        );
      }
      catch (error) {
        console.log(error);
      }

    }
    else {

      if (text != "") {
        await updateDoc(doc(db, "chats", chat[0]), {
          messages: arrayUnion({
            id: uuid(),
            text: text,
            senderId: authUser.uid,
            date: Date.now()
          })
        })
      }

      if(text!=""){
        await updateDoc(doc(db, "userChats", authUser.uid), {
          [chat[0]+".lastMessage"] : text,
          [chat[0]+".date"] : serverTimestamp()
        })

        await updateDoc(doc(db, "userChats", chat[1].userInfo.uid), {
          [chat[0]+".lastMessage"] : text,
          [chat[0]+".date"] : serverTimestamp()
        })
      }
    }

    setImg(null);
    setText("")

  }

  return (
    <div className='msginput'>
      <input value={text} onChange={handalTextChange} className='msgbox' type="text" placeholder='Type something...' />
      <div className="buttons">
        <input ref={imageRef} onChange={handalImageChange} style={{ display: "none" }} id="msginputfile" type="file" />
        <label htmlFor="msginputfile">
          <img src={AddImage} alt="" />
        </label>
        <button disabled={!chat} onClick={handalSendMessage}>Send</button>
      </div>
    </div>
  )
}

export default MessageInput
