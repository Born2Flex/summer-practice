import { faLocationDot, faWifi, faUsers, faChevronRight, faStar, faDesktop, faCakeCandles, faHandshake } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { Event } from '../../pages/EventsMapPage'

export const colorVariants = {
    'party': 'bg-yellow-500 group-hover/item:shadow-yellow-300',
    'gaming': 'bg-green-500 group-hover/item:shadow-green-400',
    'birthday': 'bg-pink-500 group-hover/item:shadow-pink-400',
    'meeting': 'bg-blue-500 group-hover/item:shadow-blue-400',
}

export const iconVariants = {
    'party': faStar,
    'gaming': faDesktop,
    'birthday': faCakeCandles,
    'meeting': faHandshake,
}

/*export const ribbonVariants = {
    'public': 'bg-green-500',
    'paid': 'bg-yellow-300',
    'private': 'bg-red-500',
}*/

export const ribbonVariants = {
    'PUBLIC': 'bg-green-500',
    'PAID': 'bg-yellow-300',
    'PRIVATE': 'bg-red-500',
}



//function EventCard({ name, location, category, people, type, link, limit, price }: Event) {
function EventCard(event: Event) {

    return (
        <div
            className="bg-gray-50/80 group/item hover:bg-gray-50 backdrop-blur-sm w-full h-auto 
            rounded-lg shadow-md flex card text-gray-700"
            style={{ transition: "background-color 0.3s" }}
        >
            <div className={`w-2 text-white flex items-center rounded-l-lg shadow-xl ${ribbonVariants[event.availability as keyof typeof ribbonVariants]}`} />

            <div className="w-full flex flex-col">
                <div className="flex flex-1 p-4">
                    <div className='w-3/4'>
                        <h3 className="text-xl mb-1 text-gray-700">{event.title}</h3>
                        <div className="text-xs flex items-center mb-4 gap-2">
                            <FontAwesomeIcon icon={faLocationDot} /> {event.locationName}
                        </div>
                        {event.entranceFee !== null && <span className="text-xl font-thin text-gray-700">£{event.entranceFee}<span className="text-lg">/PPPN</span></span>}
                        {event.entranceFee === null && <span className="text-xl font-thin text-gray-700"><span className="text-lg">FREE</span></span>}
                        <div className="flex items-center mt-4 gap-x-5">
                            <div className="flex text-xs gap-2">
                                <FontAwesomeIcon icon={faWifi} /> Free WiFi
                            </div>
                            <div className="flex text-xs gap-2">
                                <FontAwesomeIcon icon={faUsers} /> {event.currentParticipants}{event.maxParticipants !== null && `/${event.maxParticipants}`} people
                            </div>
                        </div>
                    </div>
                    <div className='flex w-1/4 items-center justify-center'>
                        <div className={`${colorVariants[event.eventType as keyof typeof colorVariants]} w-full text-white aspect-square flex items-center justify-center rounded-full shadow-rounded-lg`}>
                            <FontAwesomeIcon icon={iconVariants[event.eventType as keyof typeof iconVariants]} className='text-2xl' />
                        </div>
                    </div>

                </div>
                <NavLink
                    to={event.id}
                    className="bg-gray-100/40 group/link group-hover/item:bg-gray-200/60 p-3 flex items-center justify-between rounded-br-lg transition ease-in-out group-hover:hover:bg-gray-200">
                    See more details
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

export default EventCard