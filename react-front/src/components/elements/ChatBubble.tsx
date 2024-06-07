import { getUserId } from '../../auth'
import { Message } from '../../interfaces/MessageInterface'
import EmptyUser from "../../assets/empty-user.webp"
import { Link } from 'react-router-dom';
import { LegacyRef, forwardRef, useState } from 'react';
import ShortUser from '../../interfaces/ShortUserInterface';

function formatDateBasedOnToday(dateInput: string | Date) {
    const date = new Date(dateInput);
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const inputDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Europe/Kyiv'
    };

    if (inputDate.getTime() !== today.getTime()) {
        options.month = '2-digit';
        options.day = '2-digit';
    }

    return new Intl.DateTimeFormat(navigator.language, options).format(date);
}

const ChatBubble = forwardRef(({ sender, message }: { sender: ShortUser, message: Message }, ref: LegacyRef<HTMLDivElement> | undefined) => {
    // console.log('ChatBubble:', "SENDER:", sender, "MESSAGE:", message);
    const isSender = getUserId() === sender.id;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const sendTime = formatDateBasedOnToday(message.sendTime);
    function handleDropdown() {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const chatBubbleClasses = isSender ?
        "flex-row-reverse text-right" :
        "flex-row text-left";

    const bubbleColorClasses = isSender ?
        "bg-blue-100 dark:bg-blue-900 rounded-s-xl rounded-ee-xl" :
        "bg-gray-100 dark:bg-gray-700 rounded-e-xl rounded-es-xl";

    return (

        <div ref={ref} className={`flex items-start gap-2.5 pt-3 ${chatBubbleClasses}`}>
            <Link to={`/profile/${sender.id}`}>
                <img className="w-8 h-8 rounded-full border border-black" src={sender.imgUrl || EmptyUser} alt="sender image" />
            </Link>
            <div className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 pb-2 border-gray-200 ${bubbleColorClasses}`} >
                <Link to={`/profile/${sender.id}`}>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">{sender.firstName} {sender.lastName}</span>
                </Link>
                <div className="flex items-center space-x-2 justify-between">
                    {isSender && <div className="inline-flex text-start w-20 self-end text-xs font-normal text-gray-500 dark:text-gray-400">{sendTime}</div>}
                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message.content}</p>
                    {!isSender && <span className="flex w-max self-end text-xs font-normal text-gray-500 dark:text-gray-400">{sendTime}</span>}

                </div>
            </div>
            {isSender && (
                <div className='relative h-full flex align-middle'>
                    <button id="dropdownMenuIconButton" onClick={handleDropdown} className="inline-flex relative self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-blue-50 rounded-lg hover:bg-blue-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-blue-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                        type="button"
                    >
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                            <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                    </button>
                    {isDropdownOpen && (
                        <div id="dropdownDots" className="absolute right-10 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
                            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                </li>
                                <li>
                                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                                </li>
                            </ul>
                        </div>)}
                </div>
            )}
        </div>
    )
});

export default ChatBubble