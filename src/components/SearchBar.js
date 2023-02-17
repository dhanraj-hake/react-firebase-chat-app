import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { authContext } from '../context/authContext';
import { db } from '../firebase';

import AddAvatar from "../img/addAvatar.png";

const SearchBar = () => {

  const [username, setUsername] = useState("");

  const { authUser } = useContext(authContext); 

  const [user, setUser] = useState(null); 

  const handlChange = (event) => {
    setUsername(event.target.value);
  }

  const searchUser = async () => {

    console.log("Searching...");

    const q = query(collection(db, "user"), where("displayName", "==", username));

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc)=>{
        setUser(doc.data());
        console.log(doc.data());
      })
    }
    catch(error){
      console.log(error);
    }



  }

  const handalKeyDown = (event) => {

    if (event.code === "Enter") {
      searchUser();
    }
  }



  const handalSelect = async ()=>{

    const combineId = authUser.uid > user.uid ? authUser.uid + user.uid : user.uid + authUser.uid;

    console.log("Starting Select")
    // check user already have in chats
    const userExist =  await getDoc(doc(db, "chats", combineId));

    if(!userExist.exists()){

      // if not then create new chat
      await setDoc(doc(db, "chats", combineId), {messages : []});
      console.log("created new chat")

  
  
      // update userChats

      await updateDoc(doc(db, "userChats", authUser.uid), {
        [combineId+".userInfo"] : {
          uid : user.uid,
          displayName : user.displayName,
          photoURL : user.photoURL,
        },
        [combineId+".date"] : serverTimestamp()
      });

      await updateDoc(doc(db, "userChats", user.uid), {
        [combineId+".userInfo"] : {
          uid : authUser.uid,
          displayName : authUser.displayName,
          photoURL : authUser.photoURL,
        },
        [combineId+".date"] : serverTimestamp()
      });

      console.log("Created")
    }

    setUser(null);
    setUsername("");

  }


  return (
    <div className='searchbar'>
      <input onKeyDown={handalKeyDown} onChange={handlChange} type="text" placeholder='Find People'  value={username} />

      {user && <div className="userchat" onClick={handalSelect}>
        <img src={user.photoURL} alt="" />
        <div className="userinfo">
          <span className='username'>{user.displayName}</span>
        </div>
      </div>}
    </div>
  )
}

export default SearchBar
