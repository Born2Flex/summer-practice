import { Outlet } from "react-router-dom";
import ChatsList from "../components/sections/ChatsList";

function ChatLayout() {
    return (
        <div className='flex flex-1'>
            <ChatsList />

            <Outlet />
        </div>
    )
}

export default ChatLayout

export async function loader() {


    return null;
}