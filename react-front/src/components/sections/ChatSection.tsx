import { redirect, useLoaderData } from "react-router-dom"
import ChatHeader from "./ChatHeader"
import { getToken, getUserId } from "../../auth"
import CommentInputForm from "../forms/CommentInputForm"
import ChatBubble from "../elements/ChatBubble"
import Chat from "../../interfaces/ChatInterface"
import ShortUser from "../../interfaces/ShortUserInterface"
import { useEffect, useRef, useState } from "react"
import { useWebSocket } from "../../context/WebSocketContext"

function ChatSection() {
    const chatfetch = useLoaderData() as Chat;
    console.log("user's chat:", chatfetch, new Date());
    const [chat, setChat] = useState(chatfetch);
    const lastMessageRef = useRef<HTMLDivElement>(null)
    const { subscribeToChat, sendMessage } = useWebSocket();

    useEffect(() => {
        setChat(chatfetch);
        console.log("INNER EFFECT: ");
        subscribeToChat(chatfetch.id, (message: any) => {
            console.log("MESSAGE RECEIVED AND PASSED TO STATE: ", message);
            setChat((prevChat) => {
                return {
                    ...prevChat,
                    messages: [...prevChat.messages, message]
                }
            });
        });
    }, [chatfetch]);

    useEffect(() => {
        // Scroll into view when messages change
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }, [chat.messages]);
    // useEffect(() => {

    // }, [chat.id]);

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
                <CommentInputForm chatId={chat.id} onSubmit={sendMessage} />
            </div>
        </div>
    )
}

export default ChatSection

export async function loader({ params }: { params: any }) {
    const token = getToken();
    if (!token) {
        return redirect('/login');
    }

    const chatId = params.chatId;

    try {

        const response = await fetch(`http://localhost:8080/rest/chats/${chatId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch chat data');
        }

        return await response.json();

    } catch (error) {
        console.error('Error fetching chat data:', error);
        return null;
    }

}