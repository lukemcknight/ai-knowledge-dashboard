import { useState } from "react";
import { Send } from "lucide-react";

export default function SearchInput({ onSend, setChats }) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim()) {
            onSend(message);
            addUserChat(message);
            setMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const addUserChat = (userChat) => {
        setChats((prevChats) => [
            ...prevChats,
            { isUser: true, text: userChat }
        ]);
    }

    return (
        <div className="p-4 md:p-6">
            <div className="flex items-center gap-2 bg-muted rounded-2xl px-4 py-2">
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 outline-none placeholder:text-muted-foreground"
                />

                <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90 flex-shrink-0 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Send className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
