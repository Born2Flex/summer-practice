import { Outlet, useLoaderData } from "react-router-dom";
import ChatsList from "../components/sections/ChatsList";
import ShortChat from "../interfaces/ShortChatInterface";
import { useWebSocket } from "../context/WebSocketContext";
import { loaderApiClient } from "../utils/apiClient";

//ChatLayout component, displays the chat layout with the list of chats and the chat messages
function ChatLayout() {
    const { chats } = useLoaderData() as { chats: ShortChat[] };

    const { hasMessages, setHasMessages } = useWebSocket();
    if (hasMessages && chats.length != 0) {
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

//ChatLayout helper loader function, fetches the user's chats
async function loadChats(): Promise<ShortChat[]> {
    return await loaderApiClient.getJson<ShortChat[]>('/go-event-flow/chats');
}

//ChatLayout loader function, fetches the user's chats
export async function loader() {
    const chats = await loadChats();
    return {
        chats: chats
    };
}
