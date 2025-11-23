import { NavLink } from "react-router-dom";
import { SparklesIcon } from "@heroicons/react/24/solid";

function RagChatTab() {
    return (
        <NavLink
            to="/chat/ai"
            className={({ isActive }) =>
                `flex flex-row items-center p-3 cursor-pointer transition-all duration-200 border-b border-dashed border-gray-100 ${
                    isActive
                        ? "bg-indigo-50 border-l-4 border-l-indigo-500 shadow-sm"
                        : "hover:bg-gray-50 border-l-4 border-l-transparent"
                }`
            }
        >
            <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-md">
                    <SparklesIcon className="h-6 w-6 text-white" />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            
            <div className="flex flex-col ml-3 flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900 truncate">Event Advisor</h3>
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">AI</span>
                </div>
                <p className="text-sm text-gray-500 truncate mt-0.5">
                    Ask me anything about events!
                </p>
            </div>
        </NavLink>
    );
}

export default RagChatTab;
