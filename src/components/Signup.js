import React, { useState, useRef } from "react";

import AddAvatar from "../img/addAvatar.png";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth, storage, db } from "../firebase";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

import { doc, setDoc } from "firebase/firestore"; 

const Signup = () => {

    const navigate = useNavigate();

    const imageRef = useRef(null);
    

    const [signUpData, SetSignUpData] = useState({ "username": "", "email": "", "password": "" })

    const handleChange = (event) => {

        SetSignUpData({ ...signUpData, [event.target.name]: event.target.value });
    }

    const handlSubmit = async () => {
        const Profileimage = imageRef.current.files[0];

        

        try {


            const res = await createUserWithEmailAndPassword(auth, signUpData.email, signUpData.password)

            const storageRef = ref(storage, signUpData.username+res.user.uid);

            const uploadTask = uploadBytesResumable(storageRef, Profileimage);

            uploadTask.on('state_changed',
                (snapshot) => {

                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {

                        await updateProfile(res.user, {
                            displayName: signUpData.username,
                            photoURL: downloadURL
                        });

                        await setDoc(doc(db, "user", res.user.uid), {
                            uid : res.user.uid,
                            displayName : res.user.displayName,
                            photoURL : downloadURL,
                            email : res.user.email
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {})
                        console.log("Done");
                    });
                }
            );
            navigate("/");
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="signup">

            <span className="logo">Harsh Chat</span>
            <p className="title">Register</p>

            <div className="register-form">
                <input onChange={handleChange} type="text" placeholder="Username" name="username" />
                <input onChange={handleChange} type="email" name="email" id="email" placeholder="Email" />
                <input onChange={handleChange} type="password" name="password" id="password" placeholder="Password" />
                <input ref={imageRef} style={{ display: "none" }} name="avatar" type="file" id="avatar" />
                <label htmlFor="avatar">
                    <img src={AddAvatar} alt="" />
                    <span>Add Avatar</span>
                </label>
                <button onClick={handlSubmit} >Sign Up</button>
                <p className="loginsignupmsg">Already Have a Account <Link to="/login">Login</Link> </p>
            </div>

        </div>
    );
}


export default Signup;