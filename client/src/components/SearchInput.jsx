import { useState } from "react";
import { Paperclip, Send } from "lucide-react";
import { sendFile } from '../api/api.js';

export default function SearchInput({ onSend, setChats }) {
    const [message, setMessage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handleSend = () => {
        if (!message.trim()) return;
        onSend(message);
        addUserChat(message);
        setMessage("");
        setSelectedFile(null);
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setSelectedFile(file);

        await uploadFile(file)
    };

    const uploadFile = async (file) => {
        const formData = new FormData()
        formData.append("file", file)

        await sendFile(formData)

        console.log("File Uploaded")
        console.log(formData)
    }

    const addUserChat = (userChat) => {
        setChats((prevChats) => [
            ...prevChats,
            { isUser: true, text: userChat }
        ]);
    }

    return (
        <div className="w-full flex items-center gap-3 bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 px-4 py-3">
            <label className="cursor-pointer text-gray-500 hover:text-blue-500 transition">
                <Paperclip size={20} />
                <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>

            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-grow bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <button
                onClick={handleSend}
                className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition"
            >
                <Send size={18} />
            </button>
        </div>
    );
}
