import { useState } from "react";
import FileSearch from "../components/FileSearch";
import ChatDisplay from "../components/ChatDisplay";


export default function UploadPage() {
    const [answer, setAnswer] = useState("");
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);

    return (
        <div className="flex flex-col h-screen">
            <div className="flex-1 overflow-y-auto p-4">
                <ChatDisplay answer={answer} loading={loading} chats={chats} setChats={setChats} />
            </div>
            <div className="w-full p-4 sticky bottom-0">
                <FileSearch setAnswer={setAnswer} setLoading={setLoading} setChats={setChats} />
            </div>
        </div>
    )
}