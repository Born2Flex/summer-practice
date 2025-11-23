import { useState, useCallback } from 'react';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { Typography } from '@material-tailwind/react';
import ShortEvent from '../../interfaces/ShortEventInterface';
import { RagMessage } from '../../interfaces/RagMessageInterface';
import MessageList from './MessageList';
import ChatInputSection from './ChatInputSection';

// Mock events data
const MOCK_EVENTS: ShortEvent[] = [
    {
        id: '1',
        title: 'Summer Music Festival',
        locationName: 'Central Park',
        startDateTime: new Date(Date.now() + 86400000).toISOString(),
        eventType: 'CONCERT',
        entranceFee: 50,
        currentParticipants: 120,
        maxParticipants: 500,
        availability: 'PUBLIC',
        description: 'A great music festival.',
        host: { id: '1', firstName: 'John', lastName: 'Doe' },
        location: { x: 0, y: 0 }
    },
    {
        id: '2',
        title: 'Tech Startup Meetup',
        locationName: 'Innovation Hub',
        startDateTime: new Date(Date.now() + 172800000).toISOString(),
        eventType: 'NETWORKING',
        entranceFee: undefined,
        currentParticipants: 45,
        maxParticipants: 100,
        availability: 'PUBLIC',
        description: 'Meet local founders.',
        host: { id: '2', firstName: 'Jane', lastName: 'Smith' },
        location: { x: 0, y: 0 }
    },
    {
        id: '3',
        title: 'Modern Art Exhibition',
        locationName: 'City Gallery',
        startDateTime: new Date(Date.now() + 259200000).toISOString(),
        eventType: 'EXHIBITION',
        entranceFee: 15,
        currentParticipants: 30,
        maxParticipants: 100,
        availability: 'PAID',
        description: 'Contemporary art showcase.',
        host: { id: '3', firstName: 'Alice', lastName: 'Johnson' },
        location: { x: 0, y: 0 }
    }
];

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

    const handleSendMessage = useCallback((text: string) => {
        const newUserMessage: RagMessage = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setIsTyping(true);

        // Mock AI response logic
        setTimeout(() => {
            let responseText = "That sounds interesting! I found a few events that might match.";
            let responseEvents: ShortEvent[] | undefined = undefined;

            if (text.toLowerCase().includes('concert') || text.toLowerCase().includes('music')) {
                responseText = "Here are some concerts happening soon:";
                responseEvents = [MOCK_EVENTS[0]];
            } else if (text.toLowerCase().includes('tech') || text.toLowerCase().includes('meetup')) {
                responseText = "I found a tech meetup you might like:";
                responseEvents = [MOCK_EVENTS[1]];
            } else if (text.toLowerCase().includes('art') || text.toLowerCase().includes('exhibition')) {
                responseText = "Check out this art exhibition:";
                responseEvents = [MOCK_EVENTS[2]];
            } else {
                const randomResponse = [
                    "Could you tell me more about your preferred location?",
                    "I see. Here are some popular events this weekend.",
                    "Based on your profile, you might also like these."
                ];
                responseText = randomResponse[Math.floor(Math.random() * randomResponse.length)];
                if (Math.random() > 0.5) {
                    responseEvents = [MOCK_EVENTS[Math.floor(Math.random() * MOCK_EVENTS.length)]];
                }
            }

            const newAiMessage: RagMessage = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'ai',
                timestamp: new Date(),
                events: responseEvents
            };
            setMessages(prev => [...prev, newAiMessage]);
            setIsTyping(false);
        }, 1500);
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
