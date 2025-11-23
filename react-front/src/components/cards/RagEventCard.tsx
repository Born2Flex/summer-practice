import { faLocationDot, faCalendar, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import ShortEvent from '../../interfaces/ShortEventInterface';
import { colorVariants, iconVariants } from './EventCard';

function RagEventCard({ event }: { event: ShortEvent }) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-full max-w-xs hover:shadow-md transition-shadow duration-300">
            <div className="flex p-3 gap-3">
                {/* Icon/Type */}
                <div className="flex-shrink-0">
                    <div className={`${colorVariants[event.eventType as keyof typeof colorVariants]} w-12 h-12 text-white flex items-center justify-center rounded-full shadow-sm`}>
                        <FontAwesomeIcon icon={iconVariants[event.eventType as keyof typeof iconVariants]} className='text-lg' />
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-gray-900 truncate text-sm mb-1" title={event.title}>
                        {event.title}
                    </h4>
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                        <FontAwesomeIcon icon={faLocationDot} className="mr-1.5 w-3 text-gray-400" />
                        <span className="truncate">{event.locationName}</span>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                        <FontAwesomeIcon icon={faCalendar} className="mr-1.5 w-3 text-gray-400" />
                        <span className="truncate">{new Date(event.startDate).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>

            {/* Footer/Action */}
            <NavLink
                to={`/events/${event.id}`}
                className="block bg-gray-50 hover:bg-indigo-50 border-t border-gray-100 px-3 py-2 text-xs font-medium text-indigo-600 transition-colors flex items-center justify-between group"
            >
                View Event Details
                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
            </NavLink>
        </div>
    )
}

export default RagEventCard
