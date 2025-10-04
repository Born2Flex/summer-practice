import EventsMap from '../components/elements/EventsMap'
import { Await, Outlet, redirect, useRouteLoaderData, defer } from 'react-router-dom'
import ShortEvent from '../interfaces/ShortEventInterface';
import { Suspense } from 'react';
import { LatLngExpression } from 'leaflet';
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet';
import { loaderApiClient } from '../utils/apiClient';

//MapWithSidebarLayout component, displays the map layout with sidebar, events and user location
//makes use of Await and Suspense components to handle async data fetching
function MapWithSidebarLayout() {
    const { events, currentLocation } = useRouteLoaderData('map-layout') as { events: ShortEvent[], currentLocation: LatLngExpression };
    console.log('useRouteLoaderData:', events, currentLocation);
    return (
        <div className='flex flex-1'>
            <Suspense >
                <Await resolve={currentLocation}>
                    {(userLocation: LatLngExpression) => (
                        <Suspense fallback={
                            <section className='flex-1 z-0'>
                                <MapContainer
                                    center={userLocation}
                                    zoom={15}
                                    scrollWheelZoom={true}
                                    className="h-full w-full"
                                >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Circle
                                        center={userLocation}
                                        pathOptions={{ color: '#058afd' }}
                                        fillOpacity={0.8}
                                        radius={15}
                                    >
                                        <Popup closeButton={false} className='w-max'>
                                            <div className='p-4 font-semibold'>
                                                You are here
                                            </div>
                                        </Popup>
                                    </Circle>

                                </MapContainer>
                            </section>
                        }>
                            <Await resolve={events}>
                                {(events: ShortEvent[]) => {
                                    console.log('events passed to map:', events);
                                    return (<EventsMap events={events} userLocation={userLocation} />)
                                }}
                            </Await>
                        </Suspense>)}
                </Await>
            </Suspense>

            <Outlet />

        </div>
    )
}

export default MapWithSidebarLayout

async function loadAllEvents(): Promise<ShortEvent[]> {
    try {
        return await loaderApiClient.getJson<ShortEvent[]>('/go-event-flow/events');
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

async function loadSearchedEvents(params: string): Promise<ShortEvent[]> {
    try {
        return await loaderApiClient.getJson<ShortEvent[]>(`/go-event-flow/events/search?${params}`);
    } catch (error) {
        console.error('Error fetching events:', error);
        return [];
    }
}

export async function loader({ request }: { request: Request, params: any }) {
    
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

    return defer({
        events: shouldSearch
            ? loadSearchedEvents(url.searchParams.toString())
            : loadAllEvents(),
        currentLocation: currentLocation
    });
}