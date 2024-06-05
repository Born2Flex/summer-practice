import { Link } from 'react-router-dom'
import User from '../../interfaces/UserInterface'
import { IconButton } from '@material-tailwind/react'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EmptyUser from "../../assets/empty-user.webp"

function ChatHeader({ user }: { user: User }) {
    return (
        <section className='w-full px-8 py-4 bg-white/50 shadow-bottom'>
            <div className="flex items-center justify-between">
                <Link to={`/profile/${user.id}`} className="flex items-center gap-4">
                    <img src={user.imgUrl || EmptyUser} alt={user.firstName} className="w-12 h-12 rounded-full border border-black" />
                    <div>
                        <h3 className="font-semibold text-lg">{user.firstName} {user.lastName}</h3>
                        <p className="text-sm text-gray-500">Active now</p>
                    </div>
                </Link>

                <IconButton
                    variant='text'
                    color='gray'
                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                >
                    <FontAwesomeIcon icon={faEllipsis} className='w-5 h-5' />
                </IconButton>
            </div>
        </section>
    )
}

export default ChatHeader