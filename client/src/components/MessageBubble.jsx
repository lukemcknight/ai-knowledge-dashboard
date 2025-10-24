import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MessageBubble({ message, isUser }) {
    return (
        <div
            className={`w-full my-2 flex ${isUser ? "justify-end text-right" : "justify-start text-left"
                }`}
        >
            <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${isUser
                    ? "bg-blue-600 text-white"
                    : "bg-[#1e1f24] text-gray-200 border border-gray-700"
                    }`}
            >
                <div className="prose prose-invert max-w-none leading-relaxed text-[15px]">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
