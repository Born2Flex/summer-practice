import { defer, redirect, useFetcher, useLoaderData, useRouteLoaderData } from "react-router-dom"
import ChatHeader from "./ChatHeader"
import { getToken, getUserId } from "../../auth"
import CommentInputForm from "../forms/CommentInputForm"
import ChatBubble from "../elements/ChatBubble"
import Chat from "../../interfaces/ChatInterface"
import ShortUser from "../../interfaces/ShortUserInterface"
import { useWebSocket } from "../../context/WebSocketContext"
import { useEffect, useState } from "react"
import { Message } from "../../interfaces/MessageInterface"

function ChatSection() {
    console.log("ChatSection MOUNTED");
    const { chatData } = useLoaderData() as { chatData: Chat };


    const [messages, setMessages] = useState<Message[]>(chatData.messages);
    const { id, participants, messages: fetchedMessages } = chatData;

    const { sendMessage, subscribeToChat } = useWebSocket();

    function addMessage(message: Message) {
        setMessages([...messages, message]);
    }

    subscribeToChat(id, addMessage);

    const userId = getUserId();
    const interlocutor = participants.find(participant => participant.id !== userId) as ShortUser;

    return (
        <div className="z-0 w-3/4 bg-white/50 flex flex-col">
            <ChatHeader user={interlocutor} />
            <div className="flex flex-1 flex-col overflow-y-auto px-24">

                {fetchedMessages.length === 0 && (
                    <div className="flex flex-1 justify-center items-center">
                        <p className="text-3xl text-gray-600 font-bold">No messages yet</p>
                    </div>
                )}
                {fetchedMessages.length > 0 && (
                    fetchedMessages.map((message, index) => {
                        return (
                            <ChatBubble
                                key={index}
                                sender={participants.find(participant => participant.id === message.senderId) as ShortUser}
                                message={message}
                            />
                        )
                    }
                    ))}

            </div>
            <div className="p-3 pt-0">
                <CommentInputForm chatId={id} onSubmit={sendMessage} />
            </div>
        </div>
    )
}

export default ChatSection

export async function loader({ params }: { params: any }) {
    console.log('ChatSection loader started');
    console.log('params:', params);
    const token = getToken();
    if (!token) {
        return redirect('/login');
    }

    const chatId = params.chatId;


    const response = await fetch(`http://localhost:8080/rest/chats/${chatId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    });

    // const endTime1 = new Date();
    // const timeTaken1 = Number(endTime1) - Number(startTime1);
    // console.log(`Time taken for getting the chat data: ${timeTaken1}ms`);

    if (!response.ok) {
        throw new Error('Failed to fetch chat data');
    }


    const chatData = await response.json();
    console.log('CHAT SECTION DATA RETURNING:', chatData);
    return defer({
        chatData: chatData
    });
}