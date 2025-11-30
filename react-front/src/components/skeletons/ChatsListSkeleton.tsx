import { ShareIcon } from '@heroicons/react/24/outline'
import { IconButton } from '@material-tailwind/react'
import { ArrowLeftIcon } from '@mui/x-date-pickers/icons'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ChatTabSkeleton() {
    return (
        <div className="w-full h-20 px-6 py-4 flex flex-row items-center gap-x-4 border-b border-dashed border-gray-200">
            <Skeleton circle width={48} height={48} />
            <div className="flex flex-col flex-1 gap-y-2">
                <div className="flex justify-between items-center">
                    <Skeleton width={100} />
                    <Skeleton width={40} />
                </div>
                <Skeleton width={150} />
            </div>
        </div>
    )
}

function ChatsListSkeleton() {
    return (
        <section className='w-1/4 flex flex-col bg-white/70 justify-between min-w-[384px] z-10 relative shadow-right overflow-hidden'>
            <div className="flex flex-row justify-between px-6 pt-4">
                <IconButton variant="text" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <ArrowLeftIcon className="w-5 h-5" />
                </IconButton>

                <p className="flex items-center text-sm font-semibold">Your Chats</p>

                <IconButton variant="text" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    <ShareIcon className="w-5 h-5" />
                </IconButton>
            </div>

            <div className='flex flex-1 flex-col overflow-y-auto custom-scrollbar scrollbar-thin mt-4 divide-y divide-dashed shadow-inner'>
                {[...Array(5)].map((_, i) => (
                    <ChatTabSkeleton key={i} />
                ))}
            </div>
        </section>
    )
}

export default ChatsListSkeleton
