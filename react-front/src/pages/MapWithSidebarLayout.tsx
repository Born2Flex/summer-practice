import EventsMap from '../components/elements/EventsMap'
import { Outlet, useRouteLoaderData } from 'react-router-dom'
import ShortEvent from '../interfaces/ShortEventInterface';
import { LatLngExpression } from 'leaflet';
import { loaderApiClient } from '../utils/apiClient';

//MapWithSidebarLayout component, displays the map layout with sidebar, events and user location
function MapWithSidebarLayout() {
    const { events, currentLocation } = useRouteLoaderData('map-layout') as { events: ShortEvent[], currentLocation: LatLngExpression };
    console.log('useRouteLoaderData:', events, currentLocation);
    return (
        <div className='flex flex-1'>
            <EventsMap events={events} userLocation={currentLocation} />
            <Outlet />
        </div>
    )
}

export default MapWithSidebarLayout

async function loadAllEvents(): Promise<ShortEvent[]> {
    return await loaderApiClient.getJson<ShortEvent[]>('/go-event-flow/events');
}

async function loadSearchedEvents(params: string): Promise<ShortEvent[]> {
    return await loaderApiClient.getJson<ShortEvent[]>(`/go-event-flow/events/search?${params}`);
}

export async function loader({ request }: { request: Request }) {
    
    const url = new URL(request.url);

    const currentLocation = await new Promise<LatLngExpression>((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve([latitude, longitude]);
            },
            () => {
                console.log('Location access denied by user.');
                resolve([40.7128, -74.0060]);
            }
        );
    });

    const shouldSearch = url.searchParams.toString() !== '';

    const events = await (shouldSearch
        ? loadSearchedEvents(url.searchParams.toString())
        : loadAllEvents());

    return {
        events: events,
        currentLocation: currentLocation
    };
}