import { Await, Outlet, defer, useLoaderData } from "react-router-dom";
import ChatsList from "../components/sections/ChatsList";
import ShortChat from "../interfaces/ShortChatInterface";
import { useWebSocket } from "../context/WebSocketContext";
import { Suspense } from "react";
import { loaderApiClient } from "../utils/apiClient";

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
async function loadChats(): Promise<ShortChat[]> {
    try {
        return await loaderApiClient.getJson<ShortChat[]>('/go-event-flow/chats');
    } catch (error) {
        console.error('Error fetching chats:', error);
        return [];
    }
}

//ChatLayout loader function, fetches the user's chats
export async function loader() {
    console.log('ChatLayout loader started');    
    return defer({
        chats: loadChats()
    })
}
