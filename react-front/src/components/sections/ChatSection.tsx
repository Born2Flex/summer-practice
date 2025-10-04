import { redirect, useParams } from "react-router-dom"
import ChatHeader from "./ChatHeader"
import { getAccessToken, getUserId } from "../../auth"
import ChatBubble from "../elements/ChatBubble"
import Chat from "../../interfaces/ChatInterface"
import ShortUser from "../../interfaces/ShortUserInterface"
import { useEffect, useRef, useState } from "react"
import { useWebSocket } from "../../context/WebSocketContext"
import ChatInput from "../inputs/ChatInput"
import { useChat } from "../../hooks/useApiQueries"

//ChatSection component, displays the chat section with the chat messages and input
function ChatSection() {
    const { chatId } = useParams<{ chatId: string }>();
    const { data: chatfetch, isLoading, error } = useChat(chatId!);
    const [chat, setChat] = useState<Chat | null>(null);
    const lastMessageRef = useRef<HTMLDivElement>(null)
    const { subscribeToChat, sendMessage } = useWebSocket();

    useEffect(() => {
        if (chatfetch) {
            setChat(chatfetch);
        }
    }, [chatfetch]);

    //Subscribe to chat and update chat state with incoming messages
    useEffect(() => {
        if (!chat) return;
        
        console.log("INNER EFFECT: ");
        subscribeToChat(chat.id, (message: any) => {
            console.log("MESSAGE RECEIVED AND PASSED TO STATE: ", message);
            setChat((prevChat) => {
                if (!prevChat) return prevChat;
                return {
                    ...prevChat,
                    messages: [...prevChat.messages, message]
                }
            });
        });
    }, [chat, subscribeToChat]);

    //Scroll to the last message on chat update
    useEffect(() => {
        if (lastMessageRef.current && chat) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [chat?.messages]);

    if (isLoading) {
        return (
            <div className="z-0 w-3/4 bg-white/50 flex flex-col justify-center items-center">
                <p>Loading chat...</p>
            </div>
        );
    }

    if (error || !chat) {
        return (
            <div className="z-0 w-3/4 bg-white/50 flex flex-col justify-center items-center">
                <p>Error loading chat</p>
            </div>
        );
    }

    console.log("user's state chat: ", chat, new Date());

    const userId = getUserId();
    const interlocutor = chat.participants.find(participant => participant.id !== userId) as ShortUser;


    return (
        <div className="z-0 w-3/4 bg-white/50 flex flex-col">
            <ChatHeader user={interlocutor} />
            <div className="flex flex-1 flex-col overflow-y-auto px-24 custom-scrollbar">

                {chat.messages.length === 0 && (
                    <div className="flex flex-1 justify-center items-center">
                        <p className="text-3xl text-gray-600 font-bold">No messages yet</p>
                    </div>
                )}
                {chat.messages.length > 0 && (
                    chat.messages.map((message, index) => (
                        <ChatBubble
                            key={index}
                            sender={chat.participants.find(participant => participant.id === message.senderId) as ShortUser}
                            message={message}
                            ref={index === chat.messages.length - 1 ? lastMessageRef : undefined}
                        />
                    ))
                )}

            </div>
            <div className="p-3 pt-0">
                <ChatInput chatId={chat.id} onSubmit={sendMessage} />
            </div>
        </div>
    )
}

export default ChatSection

export async function loader({ params }: { params: any }) {
    const token = getAccessToken();
    if (!token) {
        return redirect('/login');
    }

    return { chatId: params.chatId };
}