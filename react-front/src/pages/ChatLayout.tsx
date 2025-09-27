import { Await, Outlet, defer, redirect, useLoaderData } from "react-router-dom";
import ChatsList from "../components/sections/ChatsList";
import { getToken } from "../auth";
import ShortChat from "../interfaces/ShortChatInterface";
import { useWebSocket } from "../context/WebSocketContext";
import { Suspense } from "react";

//ChatLayout component, displays the chat layout with the list of chats and the chat messages
function ChatLayout() {
    console.log("ChatLayout MOUNTED");
    const { chats } = useLoaderData() as { chats: ShortChat[] };
    console.log("user's chats: ", chats);

    const { hasMessages, setHasMessages } = useWebSocket();
    if (hasMessages && chats.length != 0) {
        setHasMessages(false);
    }

    return (
        <div className='flex flex-1'>
            <Suspense >
                <Await resolve={chats}>
                    {(chats: ShortChat[]) => (
                        <>
                            <ChatsList chats={chats} />
                            <Outlet />
                        </>
                    )}

                </Await>
            </Suspense>
        </div>
    );
}

export default ChatLayout;

//ChatLayout helper loader function, fetches the user's chats
async function loadChats(token: string) {
    const baseurl = import.meta.env.VITE_API_URL as string || 'http://localhost:8080';

    try {
        const response = await fetch(`${baseurl}/go-event-flow/chats`, {
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

//ChatLayout loader function, fetches the user's chats
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
