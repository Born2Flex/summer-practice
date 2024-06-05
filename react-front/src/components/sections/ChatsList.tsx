import { ShareIcon } from '@heroicons/react/24/outline'
import { IconButton } from '@material-tailwind/react'
import { ArrowLeftIcon } from '@mui/x-date-pickers/icons'
import { NavLink } from 'react-router-dom'

function ChatsList() {
    return (
        <section className='w-1/4 flex flex-col bg-white/70 justify-between min-w-[384px] z-10 relative shadow-right py-4 px-6 overflow-hidden'>
            <div className="flex flex-col mb-5 z-10 overflow-y-auto custom-scrollbar">

                <div className="flex flex-row justify-between">
                    <NavLink to='..'>
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

            </div>

        </section>
    )
}

export default ChatsList