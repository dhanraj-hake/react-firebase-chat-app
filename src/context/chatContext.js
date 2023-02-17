import { createContext, useState } from "react";


export const chatContext = createContext();


export const ChatState = (props)=>{

    const [chat, setChat] = useState(null);

    const selectChat = (chat)=>{
        setChat(chat);
    }

    return (
        <chatContext.Provider value={{chat : chat, selectChat : selectChat}}>
            {props.children}
        </chatContext.Provider>
    );
}