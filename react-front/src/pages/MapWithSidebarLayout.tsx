import EventsMap from '../components/elements/EventsMap'
import { events } from './EventsMapPage'
import { Outlet } from 'react-router-dom'

function MapWithSidebarLayout() {
    return (
        <div className='flex flex-1'>
            <EventsMap events={events} />
            <Outlet />
        </div>

    )
}

export default MapWithSidebarLayout