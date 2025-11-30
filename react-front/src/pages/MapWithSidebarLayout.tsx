import EventsMap from '../components/elements/EventsMap'
import { Await, defer, Outlet, useRouteLoaderData } from 'react-router-dom'
import ShortEvent from '../interfaces/ShortEventInterface';
import { LatLngExpression } from 'leaflet';
import { Suspense } from 'react';

//MapWithSidebarLayout component, displays the map layout with sidebar, events and user location
function MapWithSidebarLayout() {
    const { events, currentLocation } = useRouteLoaderData('map-layout') as { events: Promise<ShortEvent[]>, currentLocation: LatLngExpression };
    
    return (
        <div className='flex flex-1'>
            <Suspense fallback={<EventsMap events={[]} userLocation={currentLocation} />}>
                <Await 
                    resolve={events}
                    errorElement={<EventsMap events={[]} userLocation={currentLocation} />}
                >
                    {(resolvedEvents) => <EventsMap events={resolvedEvents} userLocation={currentLocation} />}
                </Await>
            </Suspense>
            <Outlet />
        </div>
    )
}

export default MapWithSidebarLayout


import { eventKeys, fetchEvents } from '../hooks/useEvents';
import { queryClient } from '../utils/queryClient';

export async function loader({ request }: { request: Request }) {
    
    const url = new URL(request.url);

    const currentLocation = await new Promise<[number, number]>((resolve) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                resolve([latitude, longitude]);
            },
            () => {
                console.log('Location access denied by user.');
                resolve([47.0175, 28.8414]);
            }
        );
    });

    const shouldSearch = url.searchParams.toString() !== '';
    
    // Construct params object for useEvents/fetchEvents
    // We need to parse URLSearchParams back to EventSearchParams
    // For now, we can just pass the raw params if fetchEvents supports it, 
    // but fetchEvents expects EventSearchParams object.
    
    // Simplified approach: Reconstruct the params object manually or pass the string if we modify fetchEvents.
    // But fetchEvents is typed. Let's construct the object.
    
    const searchParams: any = {};
    url.searchParams.forEach((value, key) => {
        if (searchParams[key]) {
            if (Array.isArray(searchParams[key])) {
                searchParams[key].push(value);
            } else {
                searchParams[key] = [searchParams[key], value];
            }
        } else {
            searchParams[key] = value;
        }
    });
    
    // Always add location
    searchParams.latitude = currentLocation[0];
    searchParams.longitude = currentLocation[1];

    const queryKey = shouldSearch ? eventKeys.list(searchParams) : eventKeys.lists();
    
    // Use ensureQueryData to fetch or get from cache
    const eventsPromise = queryClient.ensureQueryData({
        queryKey: queryKey,
        queryFn: () => fetchEvents(shouldSearch ? searchParams : undefined)
    });

    return defer({
        events: eventsPromise,
        currentLocation: currentLocation
    });
}
