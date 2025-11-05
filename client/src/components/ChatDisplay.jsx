import { useEffect } from 'react'
import MessageBubble from './MessageBubble';
import { Loader2 } from 'lucide-react';

export default function ChatDisplay({ answer, loading, chats, setChats }) {

    useEffect(() => {
        if (answer) {
            setChats((prevChats) => [
                ...prevChats,
                { isUser: false, text: answer }
            ]);
        }
    }, [answer, setChats]);

    return (
        <div className="w-full px-4">
            {chats.length === 0 && !loading && (
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-4 p-10 rounded-full bg-[#add8e6]/20">
                        <svg className="w-12 h-12 text-[#add8e6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                    </div>
                    <h1 className="text-xl font-semibold text-white mb-2">Welcome to AI Knowledge Dashboard</h1>
                    <p className="text-gray-300 max-w-md">Ask questions about your uploaded documents or search through your knowledge base.</p>
                </div>
            )}

            {chats.length > 0 && (
                <div className="space-y-6">
                    {chats.map((chat, index) => (
                        <MessageBubble
                            key={index}
                            isUser={chat.isUser}
                            message={chat.text}
                        />
                    ))}
                </div>
            )}

            {loading && (
                <div className="flex justify-start">
                    <div className="max-w-[75%] rounded-lg px-7 py-5 bg-[#add8e6] text-gray-900 border border-[#add8e6]/80 flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin text-gray-700" />
                        <span className="text-gray-700">Thinking...</span>
                    </div>
                </div>
            )}
        </div>
    )
}