import { Await, Outlet, defer, redirect, useLoaderData, useRouteLoaderData } from "react-router-dom";
import ChatsList from "../components/sections/ChatsList";
import { getToken } from "../auth";
import ShortChat from "../interfaces/ShortChatInterface";
import { useWebSocket } from "../context/WebSocketContext";
import { Suspense } from "react";

function ChatLayout() {
    console.log("ChatLayout MOUNTED");
    const { chats } = useLoaderData() as { chats: ShortChat[] };
    console.log("user's chats: ", chats);

    const { hasMessages, setHasMessages } = useWebSocket();
    if (hasMessages) {
        setHasMessages(false);
    }

    return (
        <div className='flex flex-1'>
            <Suspense >
                <Await resolve={chats}>
                    {(chats: ShortChat[]) => <ChatsList chats={chats} />}
                </Await>
            </Suspense>
            <Outlet />
        </div>
    );
}

export default ChatLayout;

async function loadChats(token: string) {

    try {
        const response = await fetch(`http://localhost:8080/rest/chats`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        const data = await response.json();
        console.log('data:', data);

        return data;
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

export async function loader() {
    console.log('ChatLayout loader started');
    const token = getToken();
    if (!token) {
        return redirect('/login');
    }

    return defer({
        chats: loadChats(token)
    })
}
