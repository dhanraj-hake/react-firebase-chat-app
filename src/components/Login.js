import React, { useState } from "react";

import AddAvatar from "../img/addAvatar.png";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";



const Login = ()=>{

    const navigate = useNavigate();

    const [ loginData , setLoginData ] = useState({email : "", password : ""});

    const handleChange = (event)=>{
        setLoginData({...loginData, [event.target.name] : event.target.value});
    }


    const handleLogin = async() =>{
        try{

            const res = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);

            if(res.user){
                navigate("/");
            }
        }
        catch(error){
            console.log(error);
        }
    }

    return (
        <div className="signup">

            <span className="logo">Harsh Chat</span>
            <p className="title">Login</p>

            <div className="register-form">
                <input onChange={handleChange} type="email" name="email" id="email" placeholder="Email" />
                <input onChange={handleChange} type="password" name="password" id="password" placeholder="Password" />
               
                <button onClick={handleLogin} > Login</button>
                <p className="loginsignupmsg">Don't Have a Account <Link to="/signup">Register</Link> </p>
            </div>

        </div>
    );
}


export default Login;