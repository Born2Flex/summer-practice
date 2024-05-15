import { faLocationDot, faWifi, faUsers, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

function EventCard() {
    return (
        <div className="bg-white/80 backdrop-blur-sm w-full h-auto rounded-lg shadow-md flex card text-gray-700">
            <div className="w-2 text-white flex items-center rounded-l-lg shadow-xl bg-green-500" />

            <div className="w-full flex flex-col">
                <div className="flex flex-1 p-4">
                    <div className='w-3/4'>
                        <h3 className="text-xl mb-1 text-gray-700">Gaming Sus Party</h3>
                        <div className="text-xs flex items-center mb-4 gap-2">
                            <FontAwesomeIcon icon={faLocationDot} /> USA, Ohio
                        </div>
                        <span className="text-xl font-thin text-gray-700">£63.00<span className="text-lg">/PPPN</span></span>
                        <div className="flex items-center mt-4 gap-x-5">
                            <div className="flex text-xs gap-2">
                                <FontAwesomeIcon icon={faWifi} /> Free WiFi
                            </div>
                            <div className="flex text-xs gap-2">
                                <FontAwesomeIcon icon={faUsers} /> 300 people
                            </div>
                        </div>
                    </div>
                    <div className='flex w-1/4 items-center justify-center'>
                        <div className="w-full text-white aspect-square flex items-center justify-center rounded-full shadow-xl bg-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>

                </div>
                <NavLink
                    to={'puk-puk'}
                    className="bg-gray-100/60 p-3 flex items-center justify-between rounded-b-lg transition ease-in-out hover:bg-gray-200">
                    See more details
                    <FontAwesomeIcon icon={faChevronRight} />
                </NavLink>
            </div>
        </div>
    )
}

export default EventCard