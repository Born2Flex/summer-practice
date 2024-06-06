import { ShareIcon } from '@heroicons/react/24/outline'
import { IconButton } from '@material-tailwind/react'
import { ArrowLeftIcon } from '@mui/x-date-pickers/icons'
import { NavLink } from 'react-router-dom'
import ChatTab from '../elements/ChatTab'
import ShortChat from '../../interfaces/ShortChatInterface'

function ChatsList({ chats }: { chats: ShortChat[] }) {
    return (
        <section className='w-1/4 flex flex-col bg-white/70 justify-between min-w-[384px] z-10 relative shadow-right overflow-hidden'>
            <div className="flex flex-row justify-between px-6 pt-4">
                <NavLink to='..' relative='route'>
                    <IconButton
                        variant="text"
                        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </IconButton>
                </NavLink>

                <p className="flex items-center text-sm font-semibold">Your Chats</p>

                <IconButton
                    variant="text"
                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                >
                    <ShareIcon className="w-5 h-5" />
                </IconButton>
            </div>

            <div className='flex flex-1 flex-col overflow-y-auto custom-scrollbar scrollbar-thin mt-4 divide-y divide-dashed shadow-inner'>

                {chats.length === 0 && (<div className='flex flex-1 items-center justify-center'>
                    <p className="text-center text-gray-500 text-lg py-4">No chats yet</p>
                </div>)}

                {chats.length > 0 && (
                    chats.map((chat, index) => (
                        <ChatTab key={index} chat={chat} />
                    ))
                )}

            </div>

        </section>
    )
}

export default ChatsList