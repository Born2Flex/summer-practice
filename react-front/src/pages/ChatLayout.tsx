import { Outlet, redirect, useLoaderData } from "react-router-dom";
import ChatsList from "../components/sections/ChatsList";
import { getToken } from "../auth";
import ShortChat from "../interfaces/ShortChatInterface";
import { useWebSocket } from "../context/WebSocketContext";

function ChatLayout() {
    const chats = useLoaderData() as ShortChat[];
    console.log("user's chats: ", chats);

    const { hasMessages, setHasMessages } = useWebSocket();
    if (hasMessages) {
        setHasMessages(false);
    }

    return (
        <div className='flex flex-1'>
            <ChatsList chats={chats} />
            <Outlet />
        </div>
    );
}

export default ChatLayout;

export async function loader() {
    const token = getToken();
    if (!token) {
        return redirect('/login');
    }

    try {
        const response = await fetch(`http://localhost:8080/rest/chats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch chats');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching chats:', error);
    }

}
