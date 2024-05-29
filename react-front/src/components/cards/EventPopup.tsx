import { faLocationDot, faWifi, faUsers, faChevronRight, faStar, faDesktop, faCakeCandles, faHandshake } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import { Event } from '../../pages/EventsMapPage'

function EventPopup({ name, location, category, people, type, link, limit, price }: Event) {

    const ribbonVariants = {
        'public': 'bg-green-500',
        'paid': 'bg-yellow-300',
        'private': 'bg-red-500',
    }

    return (
        <div
            className="bg-gray-50/80 group/item hover:bg-gray-50 backdrop-blur-sm w-full h-auto 
            rounded-lg shadow-md flex card text-gray-700"
            style={{ transition: "background-color 0.3s" }}
        >
            <div className={`w-2 -ml-[1px] text-white flex items-center rounded-l-lg shadow-xl ${ribbonVariants[category as keyof typeof ribbonVariants]}`} />

            <div className="w-full flex flex-col">
                <div className="flex flex-1 p-4">
                    <div className='flex-1'>
                        <h3 className="text-xl mb-1 text-gray-700">{name}</h3>
                        <div className="flex text-xs mb-4 font-semibold gap-2 items-baseline">
                            <FontAwesomeIcon icon={faStar} /> {type.toUpperCase()}
                        </div>
                        {price && <span className="text-xl font-thin text-gray-700">£{price}<span className="text-lg">/PPPN</span></span>}
                        {!price && <span className="text-xl font-thin text-gray-700"><span className="text-lg">FREE</span></span>}
                        <div className="flex items-center mt-4 gap-x-5">
                            <div className="flex text-xs items-center gap-2">
                                <FontAwesomeIcon icon={faLocationDot} /> {location}
                            </div>
                            <div className="flex text-xs gap-2">
                                <FontAwesomeIcon icon={faUsers} /> {people}{limit && `/${limit}`} people
                            </div>
                        </div>
                    </div>

                </div>
                <NavLink
                    to={link}
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

export default EventPopup