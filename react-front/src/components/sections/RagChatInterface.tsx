import { useState, useCallback } from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';
import ShortEvent from '../../interfaces/ShortEventInterface';
import { RagMessage } from '../../interfaces/RagMessageInterface';
import MessageList from './MessageList';
import ChatInputSection from './ChatInputSection';
import { apiClient } from '../../utils/apiClient';
import { RagAnswerDto } from '../../interfaces/RagAnswerDto';

function RagChatInterface() {
    const [messages, setMessages] = useState<RagMessage[]>([
        {
            id: '1',
            text: "Hi there! I'm your personal Event Advisor. I can help you find the perfect events based on your interests. What are you looking for today?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = useCallback(async (text: string) => {
        const newUserMessage: RagMessage = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setIsTyping(true);

        try {
            const position = await new Promise<GeolocationPosition>((resolve) => {
                navigator.geolocation.getCurrentPosition(resolve, () => {
                    resolve({
                        coords: {
                            latitude: 47.0175,
                            longitude: 28.8414,
                            accuracy: 0,
                            altitude: null,
                            altitudeAccuracy: null,
                            heading: null,
                            speed: null
                        },
                        timestamp: Date.now()
                    } as GeolocationPosition);
                });
            });

            const { latitude, longitude } = position.coords;

            const response = await apiClient.postJson<RagAnswerDto>(
                `/go-event-flow/ai-chat/ask?messageText=${encodeURIComponent(text)}&longitude=${longitude}&latitude=${latitude}`,
                {}
            );

            const newAiMessage: RagMessage = {
                id: (Date.now() + 1).toString(),
                text: response.answer,
                sender: 'ai',
                timestamp: new Date(),
                events: response.events
            };
            setMessages(prev => [...prev, newAiMessage]);

        } catch (error) {
            console.error("Error asking AI:", error);
            const errorMessage: RagMessage = {
                id: (Date.now() + 1).toString(),
                text: "Sorry, I encountered an error while processing your request. Please try again.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    }, []);

    const suggestions = ['Concerts this weekend', 'Free workshops', 'Tech meetups', 'Art galleries'];

    return (
        <div className="flex flex-col h-full w-full bg-gray-50 relative overflow-hidden">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 p-4 flex items-center gap-3 shadow-sm z-10">
                <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg">
                    <SparklesIcon className="h-6 w-6 text-white" />
                </div>
                <div>
                    <Typography variant="h6" color="blue-gray" className="font-bold" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Event Advisor
                    </Typography>
                    <Typography variant="small" color="gray" className="font-normal flex items-center gap-1" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        Online
                    </Typography>
                </div>
            </div>

            {/* Messages Area */}
            <MessageList messages={messages} isTyping={isTyping} />

            {/* Input Area */}
            <ChatInputSection onSendMessage={handleSendMessage} suggestions={suggestions} />
        </div>
    );
}

export default RagChatInterface;
