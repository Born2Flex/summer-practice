import React, { useEffect, useRef } from 'react';
import { Typography } from '@material-tailwind/react';
import RagEventCard from '../cards/RagEventCard';
import { RagMessage } from '../../interfaces/RagMessageInterface';

interface MessageListProps {
    messages: RagMessage[];
    isTyping: boolean;
}

const MessageList = React.memo(({ messages, isTyping }: MessageListProps) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            {messages.map((msg) => (
                <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                    <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} max-w-[85%]`}>
                        <div
                            className={`px-5 py-3 shadow-sm ${
                                msg.sender === 'user'
                                    ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none'
                                    : 'bg-white text-gray-800 rounded-2xl rounded-tl-none border border-gray-100'
                            }`}
                        >
                            <Typography variant="paragraph" className="text-sm md:text-base whitespace-pre-wrap" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                {msg.text}
                            </Typography>
                        </div>
                    </div>
                    
                    {/* Event Cards */}
                    {msg.events && msg.events.length > 0 && (
                        <div className="mt-3 ml-2 flex flex-wrap gap-3 max-w-full">
                            {msg.events.map(event => (
                                <RagEventCard key={event.id} event={event} />
                            ))}
                        </div>
                    )}

                    <Typography
                        variant="small"
                        className={`text-[10px] mt-1 px-1 ${
                            msg.sender === 'user' ? 'text-gray-400 text-right' : 'text-gray-400 text-left'
                        }`} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                    >
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                </div>
            ))}
            
            {isTyping && (
                <div className="flex justify-start">
                    <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    );
});

export default MessageList;
