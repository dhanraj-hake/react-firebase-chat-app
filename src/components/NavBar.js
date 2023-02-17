import { signOut } from 'firebase/auth';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext } from '../context/authContext';
import { auth } from '../firebase';

const NavBar = () => {

  const navigate = useNavigate();

  const { authUser } = useContext(authContext);

  const handalSignOut = async()=>{
    await signOut(auth);
    navigate("/login");
  }


  return (
    <div className='navbar'>
      <div className="logo">
          Harsh Chat
      </div>

      <div className="navinfo">
          <img src={authUser.photoURL} alt="" />
          <span>{authUser.displayName}</span>
          <button onClick={handalSignOut}>Logout</button>
      </div>
    </div>
  ) 
}

export default NavBar;
