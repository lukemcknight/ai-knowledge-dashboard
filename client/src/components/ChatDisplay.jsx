import { useEffect, useState } from 'react'
import MessageBubble from './MessageBubble';

export default function ChatDisplay({ answer, loading, chats, setChats }) {

    useEffect(() => {
        if (answer) {
            setChats((prevChats) => [
                ...prevChats,
                { isUser: false, text: answer }
            ]);
        }
    }, [answer]);


    return (
        <div>
            {loading ? <p>Loading</p> : <p></p>}
            {chats.map((chat, index) => (
                <MessageBubble
                    key={index}
                    isUser={chat.isUser}
                    message={chat.text}
                />
            ))}
        </div>
    )
}