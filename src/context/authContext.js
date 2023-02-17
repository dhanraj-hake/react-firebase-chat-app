import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import { auth } from "../firebase";



export const authContext = createContext();


export const AuthState = (props)=>{

    const [authUser, setAuthUser] = useState(null);

    const [loadingUser, setLoadingUser] = useState(true);

    useEffect(()=>{

        const unsub = onAuthStateChanged(auth, (user)=>{
            setAuthUser(user);
            setLoadingUser(false);
        }); 
        return ()=>{
            unsub();
        }

    }, [])



    return (
        <authContext.Provider value={{authUser : authUser,loadingUser:loadingUser }}>
            {props.children}
        </authContext.Provider>
    );
}