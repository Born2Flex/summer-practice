import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client, over as StompOver } from 'stompjs';

const WebSocketContext = createContext<WebSocketContextType | null>(null);

interface WebSocketContextType {
    hasMessages: boolean;
    setHasMessages: (hasMessages: boolean) => void;
    client: Client | null;
    subscribeToChat: (chatId: string, onIncomingMessage: (message: any) => void) => void;
    sendMessage: (chatId: string, message: any) => void;
}

export const WebSocketProvider = ({ children, userId }: { children: ReactNode, userId: string | null }) => {
    const [client, setClient] = useState<Client | null>(null);
    const [hasMessages, setHasMessages] = useState<boolean>(false);
    const [subscribedChat, setSubscribedChat] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) {
            if (client) {
                client.disconnect(() => {
                    console.log('Disconnected');
                });
            }
            return;
        }
        console.log('socket started')
        const socket = new SockJS('http://localhost:8080/socket');
        const stompClient = StompOver(socket);

        stompClient.connect({}, () => {
            console.log('connected');
            stompClient?.subscribe(`/chat/${userId}/notifications`, (message: any) => {
                console.log(message);
                setHasMessages(true);
            });
        }, (error: any) => {
            console.error(error);
        });

        setClient(stompClient);

        return () => {
            if (client) {
                client.disconnect(() => {
                    console.log('Disconnected');
                });
            }
        };
    }, [userId]);

    const sendMessage = (chatId: string, message: any) => {
        if (client && client.connected) {
            client.send(`/app/chat/${chatId}`, {}, JSON.stringify(message));
        }
    };

    const subscribeToChat = (chatId: string, onIncomingMessage: (message: any) => void) => {
        if (client && client.connected) {
            if (subscribedChat == null) {
                setSubscribedChat(chatId);
                client.subscribe(`/chat/${chatId}/messages`, (message: any) => {
                    console.log(message);
                    const parsedMessage = JSON.parse(message.body);
                    onIncomingMessage(parsedMessage);
                });
            } else {
                client.unsubscribe(`/chat/${subscribedChat}/messages`);
                setSubscribedChat(chatId);
                client.subscribe(`/chat/${chatId}/messages`, (message: any) => {
                    console.log(message);
                    const parsedMessage = JSON.parse(message.body);
                    onIncomingMessage(parsedMessage);
                });
            }
        }
    }

    return (
        <WebSocketContext.Provider value={{ client, hasMessages, setHasMessages, sendMessage, subscribeToChat }}>
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
