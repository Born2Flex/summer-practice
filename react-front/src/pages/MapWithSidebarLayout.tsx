import EventsMap from '../components/elements/EventsMap'
//import { events } from './EventsMapPage'
import { Outlet } from 'react-router-dom'
import { useEventsContext } from '../context/EventsProvider';

function MapWithSidebarLayout() {
    const { events } = useEventsContext();

    return (
        <div className='flex flex-1'>
            <EventsMap events={events} />
            <Outlet />
        </div>

    )
}

export default MapWithSidebarLayout