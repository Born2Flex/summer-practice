import { redirect, useLoaderData } from "react-router-dom"
import ChatHeader from "./ChatHeader"
import User from "../../interfaces/UserInterface"
import { getToken, getUserId } from "../../auth"
import CommentInputForm from "../forms/CommentInputForm"
import ChatBubble from "../elements/ChatBubble"
import { Message } from "../../interfaces/MessageInterface"

function ChatSection() {
    const { user, interlocutor } = useLoaderData() as { user: User, interlocutor: User }

    const messages = [
        {
            id: "1",
            senderId: interlocutor.id,
            message: 'Hello, how are you?',
            createdAt: new Date().toLocaleTimeString(),
        },
        {
            id: "2",
            senderId: user.id,
            message: 'I am good, thank you!',
            createdAt: new Date().toLocaleTimeString(),
        },
        {
            id: "3",
            senderId: interlocutor.id,
            message: 'What are you doing?',
            createdAt: new Date().toLocaleTimeString(),
        },
        {
            id: "4",
            senderId: user.id,
            message: 'I am working on a project',
            createdAt: new Date().toLocaleTimeString(),
        },
        {
            id: "1",
            senderId: interlocutor.id,
            message: 'Hello, how are you?',
            createdAt: new Date().toLocaleTimeString(),
        },
        {
            id: "2",
            senderId: user.id,
            message: 'I am good, thank you!',
            createdAt: new Date().toLocaleTimeString(),
        },
        {
            id: "3",
            senderId: interlocutor.id,
            message: 'What are you doing?',
            createdAt: new Date().toLocaleTimeString(),
        },
        {
            id: "4",
            senderId: user.id,
            message: 'I am working on a project',
            createdAt: new Date().toLocaleTimeString(),
        }
    ] as Message[]


    return (
        <div className="z-0 w-3/4 bg-white/50 flex flex-col">
            <ChatHeader user={interlocutor} />
            <div className="flex flex-1 flex-col overflow-y-auto px-24">
                <ChatBubble sender={interlocutor} message={messages[0]} />
                <ChatBubble sender={user} message={messages[1]} />
                <ChatBubble sender={interlocutor} message={messages[2]} />
                <ChatBubble sender={user} message={messages[3]} />

            </div>
            <div className="p-3 pt-0">
                <CommentInputForm onSubmit={() => { }} />
            </div>
        </div>
    )
}

export default ChatSection

export async function loader() {
    console.log('started loader');
    const token = getToken();
    if (!token) {
        return redirect('/login');
    }
    const interlocutorId = "6653b74349a1dd4c4484c86c"
    const userId = getUserId();

    try {
        const startTime1 = new Date();

        const response = await fetch(`http://localhost:8080/rest/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const endTime1 = new Date();
        const timeTaken1 = Number(endTime1) - Number(startTime1);
        console.log(`Time taken for the first request: ${timeTaken1}ms`);

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        const startTime2 = new Date();

        const response2 = await fetch(`http://localhost:8080/rest/users/${interlocutorId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const endTime2 = new Date();
        const timeTaken2 = Number(endTime2) - Number(startTime2);
        console.log(`Time taken for the second request: ${timeTaken2}ms`);

        if (!response2.ok) {
            throw new Error('Failed to fetch events');
        }


        return {
            user: await response.json(),
            interlocutor: await response2.json()
        }

    } catch (error) {
        console.error('Error fetching events:', error);
        return null;
    }

}