import { Chip } from "@material-tailwind/react";
import { SparklesIcon } from "@heroicons/react/24/solid";

interface QuickPicksProps {
    onSelect: (text: string) => void;
    suggestions: string[];
}

function QuickPicks({ onSelect, suggestions }: QuickPicksProps) {
    return (
        <div className="w-full overflow-x-auto no-scrollbar py-2 px-1">
            <div className="flex gap-2 items-center">
                <div className="flex items-center gap-1 text-xs font-semibold text-indigo-500 mr-2 whitespace-nowrap">
                    <SparklesIcon className="w-3 h-3" />
                    Try asking:
                </div>
                {suggestions.map((suggestion) => (
                    <Chip
                        key={suggestion}
                        value={suggestion}
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer hover:bg-indigo-100 hover:text-indigo-800 transition-all rounded-full normal-case font-medium border border-indigo-50 bg-indigo-50/50 text-indigo-600 whitespace-nowrap"
                        onClick={() => onSelect(suggestion)}
                    />
                ))}
            </div>
        </div>
    );
}

export default QuickPicks;
