import { faLocationDot, faWifi, faUsers, faChevronRight, faStar, faDesktop, faCakeCandles, faHandshake } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

interface EventCardProps {
    // id: number;
    name: string;
    location: string;
    people: number;
    type: string;
    link: string;
    limit?: number;
    price?: number;
}

function EventCard({ name, location, people, type, link, limit, price }: EventCardProps) {
    let Icon = faStar

    const colorVariants = {
        'party': 'bg-yellow-500 group-hover/item:shadow-yellow-300',
        'gaming': 'bg-green-500 group-hover/item:shadow-green-400',
        'birthday': 'bg-pink-500 group-hover/item:shadow-pink-400',
        'meeting': 'bg-blue-500 group-hover/item:shadow-blue-400',
    }

    if (type === 'gaming') { Icon = faDesktop }
    if (type === 'birthday') { Icon = faCakeCandles }
    if (type === 'meeting') { Icon = faHandshake }

    return (
        <div
            className="bg-green-50/70 group/item hover:bg-gray-50/90 backdrop-blur-sm w-full h-auto 
            rounded-lg shadow-md flex card text-gray-700"
            style={{ transition: "background-color 0.3s" }}
        >
            <div className={`w-2 text-white flex items-center rounded-l-lg shadow-xl bg-green-500`} />

            <div className="w-full flex flex-col">
                <div className="flex flex-1 p-4">
                    <div className='w-3/4'>
                        <h3 className="text-xl mb-1 text-gray-700">{name}</h3>
                        <div className="text-xs flex items-center mb-4 gap-2">
                            <FontAwesomeIcon icon={faLocationDot} /> {location}
                        </div>
                        {price && <span className="text-xl font-thin text-gray-700">£{price}<span className="text-lg">/PPPN</span></span>}
                        {!price && <span className="text-xl font-thin text-gray-700"><span className="text-lg">FREE</span></span>}
                        <div className="flex items-center mt-4 gap-x-5">
                            <div className="flex text-xs gap-2">
                                <FontAwesomeIcon icon={faWifi} /> Free WiFi
                            </div>
                            <div className="flex text-xs gap-2">
                                <FontAwesomeIcon icon={faUsers} /> {people}{limit && `/${limit}`} people
                            </div>
                        </div>
                    </div>
                    <div className='flex w-1/4 items-center justify-center'>
                        <div className={`${colorVariants[type as keyof typeof colorVariants]} w-full text-white aspect-square flex items-center justify-center rounded-full shadow-rounded-lg`}>
                            <FontAwesomeIcon icon={Icon} className='text-2xl' />
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

export default EventCard