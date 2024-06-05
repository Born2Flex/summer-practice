import Background from '../elements/Background'
import { ShareIcon } from '@heroicons/react/24/outline'
import { IconButton } from '@material-tailwind/react'
import { ArrowLeftIcon } from '@mui/x-date-pickers/icons'
import { NavLink } from 'react-router-dom'

function ChatsList() {
    return (
        <section className='w-1/4 flex flex-col justify-between min-w-[384px] bg-white z-10 relative shadow-right py-4 pr-7 pl-3 bg-white/70 overflow-hidden'>
            <Background />
            <div className="absolute z-0 pointer-events-none top-0 left-0 w-full h-full bg-white/65" />

            <div className="flex flex-col pr-4 mb-5 z-10 overflow-y-auto custom-scrollbar">

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

                    <div className="flex gap-x-4">
                        <IconButton
                            variant="text"
                            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        >
                            <ShareIcon className="w-5 h-5" />
                        </IconButton>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default ChatsList