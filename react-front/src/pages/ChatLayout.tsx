import { Await, defer, Outlet, useLoaderData } from "react-router-dom";
import ChatsList from "../components/sections/ChatsList";
import ShortChat from "../interfaces/ShortChatInterface";
import { useWebSocket } from "../context/WebSocketContext";
import { loaderApiClient } from "../utils/apiClient";
import { Suspense } from "react";
import ChatsListSkeleton from "../components/skeletons/ChatsListSkeleton";

//ChatLayout component, displays the chat layout with the list of chats and the chat messages
function ChatLayout() {
    const { chats } = useLoaderData() as { chats: Promise<ShortChat[]> };

    const { hasMessages, setHasMessages } = useWebSocket();
    
    // This side effect might need to be handled differently if chats is a promise
    // But for now, we can't easily check chats.length inside the component body if it's a promise.
    // We'll move this logic inside the Await component or a wrapper.
    
    return (
        <div className='flex flex-1'>
            <Suspense fallback={<ChatsListSkeleton />}>
                <Await 
                    resolve={chats}
                    errorElement={
                        <div className="w-1/4 min-w-[384px] flex items-center justify-center bg-white/70">
                            <p className="text-red-500">Error loading chats</p>
                        </div>
                    }
                >
                    {(resolvedChats) => {
                         if (hasMessages && resolvedChats.length != 0) {
                            setHasMessages(false);
                        }
                        return <ChatsList chats={resolvedChats} />;
                    }}
                </Await>
            </Suspense>
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
    const chatsPromise = loadChats();
    return defer({
        chats: chatsPromise
    });
}
