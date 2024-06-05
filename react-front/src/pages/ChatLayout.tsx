import { Outlet, redirect, useLoaderData } from "react-router-dom";
import ChatsList from "../components/sections/ChatsList";
import { getToken, getUserId } from "../auth";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';
import ShortChat from "../interfaces/ShortChatInterface";

function ChatLayout() {
    const chats = useLoaderData() as ShortChat[];
    console.log("user's chats: ", chats);

    const socket = new SockJS('http://localhost:8080/socket');
    const stompClient = over(socket);
    const userId = getUserId();

    stompClient.connect({}, () => {
        console.log('connected');
        stompClient?.subscribe(`/chat/${userId}/test`, (message: any) => {
            console.log(message);
        });
    }, (error: any) => {
        console.error(error);
    });

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
