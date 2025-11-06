import { useState, useEffect } from "react";
import FileSearch from "../components/FileSearch";
import ChatDisplay from "../components/ChatDisplay";
import Sidebar from "../components/Sidebar";
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function ChatPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        if (!user) {
            navigate('/auth');
        }
    }, [user, navigate]);

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            <Sidebar />

            <main className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-8 py-12">
                    <ChatDisplay
                        answer={answer}
                        loading={loading}
                        chats={chats}
                        setChats={setChats}
                    />
                </div>

                <FileSearch
                    setAnswer={setAnswer}
                    setLoading={setLoading}
                    setChats={setChats}
                />
            </main>
        </div>
    )
}