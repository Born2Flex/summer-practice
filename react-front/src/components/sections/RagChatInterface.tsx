import { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { IconButton, Input, Typography } from '@material-tailwind/react';
import { useAuth } from '../../context/AuthContext';
import ShortEvent from '../../interfaces/ShortEventInterface';
import RagEventCard from '../cards/RagEventCard';
import QuickPicks from '../elements/QuickPicks';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'ai';
    timestamp: Date;
    events?: ShortEvent[];
}

// Mock events data
const MOCK_EVENTS: ShortEvent[] = [
    {
        id: '1',
        title: 'Summer Music Festival',
        locationName: 'Central Park',
        startDate: new Date(Date.now() + 86400000).toISOString(),
        eventType: 'CONCERT',
        entranceFee: 50,
        currentParticipants: 120,
        maxParticipants: 500,
        availability: 'PUBLIC',
        description: 'A great music festival.',
        organizerId: '1',
        endDate: new Date().toISOString(),
        location: { latitude: 0, longitude: 0 }
    },
    {
        id: '2',
        title: 'Tech Startup Meetup',
        locationName: 'Innovation Hub',
        startDate: new Date(Date.now() + 172800000).toISOString(),
        eventType: 'NETWORKING',
        entranceFee: null,
        currentParticipants: 45,
        maxParticipants: 100,
        availability: 'PUBLIC',
        description: 'Meet local founders.',
        organizerId: '1',
        endDate: new Date().toISOString(),
        location: { latitude: 0, longitude: 0 }
    },
    {
        id: '3',
        title: 'Modern Art Exhibition',
        locationName: 'City Gallery',
        startDate: new Date(Date.now() + 259200000).toISOString(),
        eventType: 'EXHIBITION',
        entranceFee: 15,
        currentParticipants: 30,
        maxParticipants: null,
        availability: 'PAID',
        description: 'Contemporary art showcase.',
        organizerId: '1',
        endDate: new Date().toISOString(),
        location: { latitude: 0, longitude: 0 }
    }
];

function RagChatInterface() {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi there! I'm your personal Event Advisor. I can help you find the perfect events based on your interests. What are you looking for today?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSendMessage = async (text: string = inputValue) => {
        if (!text.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
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

            const newAiMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'ai',
                timestamp: new Date(),
                events: responseEvents
            };
            setMessages(prev => [...prev, newAiMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

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
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                    >
                        <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} max-w-[85%]`}>
                            <div
                                className={`px-5 py-3 shadow-sm ${
                                    msg.sender === 'user'
                                        ? 'bg-indigo-600 text-white rounded-2xl rounded-tr-none'
                                        : 'bg-white text-gray-800 rounded-2xl rounded-tl-none border border-gray-100'
                                }`}
                            >
                                <Typography variant="paragraph" className="text-sm md:text-base whitespace-pre-wrap" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    {msg.text}
                                </Typography>
                            </div>
                        </div>
                        
                        {/* Event Cards */}
                        {msg.events && msg.events.length > 0 && (
                            <div className="mt-3 ml-2 flex flex-wrap gap-3 max-w-full">
                                {msg.events.map(event => (
                                    <RagEventCard key={event.id} event={event} />
                                ))}
                            </div>
                        )}

                        <Typography
                            variant="small"
                            className={`text-[10px] mt-1 px-1 ${
                                msg.sender === 'user' ? 'text-gray-400 text-right' : 'text-gray-400 text-left'
                            }`} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        >
                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                    </div>
                ))}
                
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-gray-200 p-4 pb-6 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="max-w-4xl mx-auto space-y-3">
                    <QuickPicks 
                        suggestions={suggestions} 
                        onSelect={(text) => handleSendMessage(text)} 
                    />
                    
                    <div className="relative flex w-full">
                        <Input
                            type="text"
                            placeholder="Ask for event recommendations..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="!border !border-gray-300 bg-gray-50 text-gray-900 shadow-inner ring-4 ring-transparent placeholder:text-gray-500 focus:!border-indigo-500 focus:!border-t-indigo-500 focus:ring-indigo-500/20 rounded-xl py-6 pl-6 pr-12 transition-all"
                            labelProps={{
                                className: "hidden",
                            }}
                            containerProps={{
                                className: "min-w-0",
                            }} crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        />
                        <div className="absolute right-2 top-1/2 -translate-y-1/2">
                            <IconButton
                                size="sm"
                                color={inputValue.trim() ? "indigo" : "blue-gray"}
                                variant={inputValue.trim() ? "gradient" : "text"}
                                disabled={!inputValue.trim()}
                                className="rounded-lg"
                                onClick={() => handleSendMessage()} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                <PaperAirplaneIcon className="h-4 w-4" />
                            </IconButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RagChatInterface;
