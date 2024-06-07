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

const subscriptions = new Map<string, Subscription>();
const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children, userId }: { children: ReactNode, userId: string | null }) => {
    const [client, setClient] = useState<Client | null>(null);
    const [hasMessages, setHasMessages] = useState<boolean>(false);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/socket');
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

    const sendMessage = (chatId: string, message: any) => {
        if (client && client.connected) {
            client.send(`/app/chat/${chatId}`, {}, JSON.stringify(message));
        }
    };

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
