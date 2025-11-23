import { useState } from 'react';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { IconButton, Input } from '@material-tailwind/react';
import QuickPicks from '../elements/QuickPicks';

interface ChatInputSectionProps {
    onSendMessage: (text: string) => void;
    suggestions: string[];
}

function ChatInputSection({ onSendMessage, suggestions }: ChatInputSectionProps) {
    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = (text: string = inputValue) => {
        if (!text.trim()) return;
        onSendMessage(text);
        setInputValue('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
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
                        }} crossOrigin={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                        <IconButton
                            size="sm"
                            color={inputValue.trim() ? "indigo" : "blue-gray"}
                            variant={inputValue.trim() ? "gradient" : "text"}
                            disabled={!inputValue.trim()}
                            className="rounded-lg"
                            onClick={() => handleSendMessage()} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                            <PaperAirplaneIcon className="h-4 w-4" />
                        </IconButton>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatInputSection;
