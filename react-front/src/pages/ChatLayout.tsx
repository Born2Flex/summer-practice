import { Outlet } from "react-router-dom";
import ChatsList from "../components/sections/ChatsList";
import { getUserId } from "../auth";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

function ChatLayout() {
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
            <ChatsList />
            <Outlet />
        </div>
    );
}

export default ChatLayout;
