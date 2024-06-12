import { faUsers, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import ShortEvent from '../../interfaces/ShortEventInterface';
import { colorVariants, iconVariants, ribbonVariants } from './EventCard'

//EventPopup component, displays the event popup with the event's details
function EventPopup({ id, title, availability, currentParticipants, eventType, maxParticipants, entranceFee }: ShortEvent) {
    return (
        <div
            className="bg-gray-50/80 group/item hover:bg-gray-50 backdrop-blur-sm w-full h-auto 
            rounded-lg shadow-md flex card text-gray-700"
            style={{ transition: "background-color 0.3s" }}
        >
            <div className={`w-2 -ml-[1px] text-white flex items-center rounded-l-lg shadow-xl ${ribbonVariants[availability as keyof typeof ribbonVariants]}`} />

            <div className="w-full flex flex-col">
                <div className="grid grid-cols-2 gap-4 p-4">
                    <div>
                        <div className='flex flex-row justify-between gap-6 mb-4'>
                            <div className="text-xl font-bold text-gray-700">{title}</div>

                        </div>

                        {entranceFee !== null && <span className="text-xl font-thin text-gray-700">£{entranceFee}<span className="text-lg">/PPPN</span></span>}
                        {entranceFee === null && <span className="text-xl font-thin text-gray-700"><span className="text-lg">FREE</span></span>}
                        <div className="flex items-center mt-4 gap-x-5">

                            <div className="flex text-xs gap-2">
                                <FontAwesomeIcon icon={faUsers} /> {currentParticipants}{maxParticipants && `/${maxParticipants}`} people
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className={`${colorVariants[eventType as keyof typeof colorVariants]} w-3/4 text-white aspect-square flex items-center justify-center rounded-full shadow-rounded-lg`}>
                            <FontAwesomeIcon icon={iconVariants[eventType as keyof typeof iconVariants]} className='text-2xl' />
                        </div>
                    </div>

                </div>
                <NavLink
                    to={`${id}`}
                    className="bg-gray-100/40 group/link group-hover/item:bg-gray-200/60 p-3 flex items-center justify-between rounded-br-lg transition ease-in-out group-hover:hover:bg-gray-200">
                    Go to event
                    <FontAwesomeIcon
                        icon={faChevronRight}
                        className='-translate-x-1 group-hover/link:translate-x-0.5'
                        style={{ transition: "transform 0.3s" }}
                    />
                </NavLink>
            </div>
        </div>
    )
}

export default EventPopup