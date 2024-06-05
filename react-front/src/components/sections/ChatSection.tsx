import { redirect, useLoaderData } from "react-router-dom"
import ChatHeader from "./ChatHeader"
import { getToken, getUserId } from "../../auth"
import CommentInputForm from "../forms/CommentInputForm"
import ChatBubble from "../elements/ChatBubble"
import Chat from "../../interfaces/ChatInterface"
import ShortUser from "../../interfaces/ShortUserInterface"

function ChatSection() {
    const chat = useLoaderData() as Chat;
    console.log(chat);
    if (!chat.participants) {
        return (
            <div className="z-0 w-3/4 bg-white/50 flex flex-col items-center justify-center">
                <p className="text-3xl text-gray-600 font-bold">Select a chat</p>
            </div>
        )
    }
    const userId = getUserId();
    const interlocutor = chat.participants.find(participant => participant.id !== userId) as ShortUser;

    // const messages = [
    //     {
    //         senderId: interlocutor.id,
    //         content: 'Hello, how are you?',
    //         sendTime: new Date().toLocaleTimeString(),
    //     },
    //     {
    //         senderId: user.id,
    //         content: 'I am good, thank you!',
    //         sendTime: new Date().toLocaleTimeString(),
    //     },
    //     {
    //         senderId: interlocutor.id,
    //         content: 'What are you doing?',
    //         sendTime: new Date().toLocaleTimeString(),
    //     },
    //     {
    //         senderId: user.id,
    //         content: 'I am working on a project',
    //         sendTime: new Date().toLocaleTimeString(),
    //     },
    //     {
    //         senderId: interlocutor.id,
    //         content: 'Hello, how are you?',
    //         sendTime: new Date().toLocaleTimeString(),
    //     },
    //     {
    //         senderId: user.id,
    //         content: 'I am good, thank you!',
    //         sendTime: new Date().toLocaleTimeString(),
    //     },
    //     {
    //         senderId: interlocutor.id,
    //         content: 'What are you doing?',
    //         sendTime: new Date().toLocaleTimeString(),
    //     },
    //     {
    //         senderId: user.id,
    //         content: 'I am working on a project',
    //         sendTime: new Date().toLocaleTimeString(),
    //     }
    // ] as Message[]


    return (
        <div className="z-0 w-3/4 bg-white/50 flex flex-col">
            <ChatHeader user={interlocutor} />
            <div className="flex flex-1 flex-col overflow-y-auto px-24">
                {/* <ChatBubble sender={interlocutor} message={messages[0]} />
                <ChatBubble sender={user} message={messages[1]} />
                <ChatBubble sender={interlocutor} message={messages[2]} />
                <ChatBubble sender={user} message={messages[3]} /> */}

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
                        />
                    ))
                )}

            </div>
            <div className="p-3 pt-0">
                <CommentInputForm onSubmit={() => { }} />
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
        const startTime1 = new Date();

        const response = await fetch(`http://localhost:8080/rest/chats${chatId ? '/' + chatId : ''}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const endTime1 = new Date();
        const timeTaken1 = Number(endTime1) - Number(startTime1);
        console.log(`Time taken for getting the chat data: ${timeTaken1}ms`);

        if (!response.ok) {
            throw new Error('Failed to fetch chat data');
        }

        return await response.json();

    } catch (error) {
        console.error('Error fetching chat data:', error);
        return null;
    }

}