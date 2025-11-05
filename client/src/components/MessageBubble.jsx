import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MessageBubble({ message, isUser }) {
    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
            <div
                className={`max-w-[95%] px-4 py-3 rounded-2xl ${isUser
                    ? 'bg-primary text-primary-foreground rounded-br-sm'
                    : 'bg-accent text-accent-foreground rounded-bl-sm'
                    }`}
            >
                <div className={`prose prose-sm max-w-none leading-relaxed ${isUser ? 'prose-invert' : ''}`}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0 text-sm">{children}</p>,
                            ul: ({ children }) => <ul className="my-2 ml-4 list-disc space-y-1">{children}</ul>,
                            ol: ({ children }) => <ol className="my-2 ml-4 list-decimal space-y-1">{children}</ol>,
                            li: ({ children }) => <li className="text-sm">{children}</li>,
                            code: ({ children, className }) => {
                                const isInline = !className;
                                return isInline ? (
                                    <code className={`px-1.5 py-0.5 rounded text-xs font-mono ${isUser
                                        ? 'bg-primary-foreground/20 text-primary-foreground'
                                        : 'bg-accent-foreground/20 text-accent-foreground'
                                        }`}>
                                        {children}
                                    </code>
                                ) : (
                                    <code className={`block p-3 rounded-lg text-xs font-mono overflow-x-auto ${isUser
                                        ? 'bg-primary-foreground/20 text-primary-foreground'
                                        : 'bg-accent-foreground/20 text-accent-foreground'
                                        }`}>
                                        {children}
                                    </code>
                                );
                            },
                            pre: ({ children }) => (
                                <pre className={`p-3 rounded-lg overflow-x-auto my-2 ${isUser
                                    ? 'bg-primary-foreground/20 text-primary-foreground'
                                    : 'bg-accent-foreground/20 text-accent-foreground'
                                    }`}>
                                    {children}
                                </pre>
                            ),
                            h1: ({ children }) => <h1 className="text-base font-bold mt-4 mb-2 first:mt-0">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-sm font-semibold mt-3 mb-2 first:mt-0">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-semibold mt-2 mb-1 first:mt-0">{children}</h3>,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                            a: ({ children, href }) => (
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`underline ${isUser ? 'text-primary-foreground/80' : 'text-accent-foreground/80'} hover:opacity-80`}
                                >
                                    {children}
                                </a>
                            ),
                        }}
                    >
                        {message}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
