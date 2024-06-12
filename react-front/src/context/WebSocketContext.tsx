import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import SockJS from 'sockjs-client';
import { Client, over as StompOver, Subscription } from 'stompjs';

interface WebSocketContextType {
    hasMessages: boolean;
    setHasMessages: (hasMessages: boolean) => void;
    sendMessage: (chatId: string, message: any) => void;
    subscribeToChat: (chatId: string, onIncomingMessage: (message: any) => void) => void;
    client: Client | null;
}

//Current user's WebSocket subscriptions to chats
const subscriptions = new Map<string, Subscription>();
//WebSocket context
const WebSocketContext = createContext<WebSocketContextType | null>(null);

//WebSocketProvider component, provides WebSocket context to children
export const WebSocketProvider = ({ children, userId }: { children: ReactNode, userId: string | null }) => {
    const [client, setClient] = useState<Client | null>(null);
    const [hasMessages, setHasMessages] = useState<boolean>(false);

    //Connect to WebSocket server on component mount
    useEffect(() => {
        const baseurl = import.meta.env.VITE_API_URL as string || 'http://localhost:8080';

        const socket = new SockJS(`${baseurl}/socket`);
        const stompClient = StompOver(socket);

        stompClient.connect({}, () => {
            console.log('Connected');
            if (userId) {
                stompClient.subscribe(`/chat/${userId}/notifications`, (message: any) => {
                    console.log("Notification received:", message);
                    setHasMessages(true);
                });
            }
        }, (error: any) => {
            console.error('Connection error:', error);
        });

        setClient(stompClient);

        return () => {
            stompClient.disconnect(() => {
                console.log('Disconnected');
            });
            subscriptions.forEach(sub => sub.unsubscribe());
            subscriptions.clear();
        };
    }, [userId]);

    //Send message to chat with certain id
    const sendMessage = (chatId: string, message: any) => {
        if (client && client.connected) {
            client.send(`/app/chat/${chatId}`, {}, JSON.stringify(message));
        }
    };

    //Subscribe to chat with certain id
    const subscribeToChat = (chatId: string, onIncomingMessage: (message: any) => void) => {
        if (client && client.connected) {
            const existingSubscription = subscriptions.get(chatId);
            if (existingSubscription) {
                console.log("Already subscribed to this chat:", chatId);
                return;
            }

            console.log("Subscribing to chat:", chatId);
            const subscription = client.subscribe(`/chat/${chatId}/messages`, (message) => {
                const parsedMessage = JSON.parse(message.body);
                onIncomingMessage(parsedMessage);
            });

            subscriptions.set(chatId, subscription);
        }
    };

    return (
        <WebSocketContext.Provider value={{ hasMessages, setHasMessages, sendMessage, subscribeToChat, client }}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = (): WebSocketContextType => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within WebSocketProvider');
    }
    return context;
}
