import EventsMap from '../components/elements/EventsMap'
import { Outlet, redirect, useRouteLoaderData } from 'react-router-dom'
import { getToken } from '../auth';
import { Event } from '../pages/EventsMapPage';

function MapWithSidebarLayout() {

    const events = useRouteLoaderData('map-layout') as Event[];
    return (
        <div className='flex flex-1'>
            <EventsMap events={events} />
            <Outlet />
        </div>
    )
}

export default MapWithSidebarLayout

export async function loader({ request, params }: { request: Request, params: any }) {
    const token = getToken();
    if (!token) {
        return redirect('/login');
    }

    const url = new URL(request.url);

    if (url.searchParams) {
        for (const [key, value] of url.searchParams.entries()) {
            console.log(`${key}: ${value}`);
        }
    }

    if (!url.searchParams.toString() || params.id) {
        try {
            const response = await fetch('http://localhost:8080/rest/events', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }

            const data = await response.json();
            console.log('data:', data);

            return data;

        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }
    else {
        try {
            console.log(url.searchParams.toString());
            console.log(`http://localhost:8080/rest/events/search?${url.searchParams.toString()}`)
            const response = await fetch(`http://localhost:8080/rest/events/search?${url.searchParams.toString()}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }

            const data = await response.json();
            console.log('data:', data);

            return data;
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    }

    return null;
}