import { LatLngExpression } from "leaflet";
import EventsSidebar from "../components/sections/EventsSidebar";

export interface Event {
    name: string;
    location: string;
    category: string;
    people: number;
    type: string;
    link: string;
    limit?: number;
    price?: number;
    coordinates: LatLngExpression;
}

export const events = [
    {
        name: 'Sigma Rizz Party',
        location: 'Usa, Ohio, 1234 Street',
        category: 'public',
        people: 10,
        type: 'party',
        link: '/events/1',
        limit: 20,
        coordinates: [40.7128, -74.0070],
    },
    {
        name: 'Event 2',
        location: 'Location 2',
        category: 'paid',
        people: 5,
        type: 'birthday',
        link: '/events/2',
        limit: 10,
        price: 5,
        coordinates: [40.7228, -74.0050],
    },
    {
        name: 'Event 3',
        location: 'Location 3',
        category: 'paid',
        people: 15,
        type: 'meeting',
        link: '/events/3',
        price: 15,
        coordinates: [40.7008, -74.0130],
    },
    {
        name: 'Event 4',
        location: 'Location 4',
        category: 'paid',
        people: 20,
        type: 'gaming',
        link: '/events/4',
        limit: 40,
        price: 20,
        coordinates: [40.7128, -74.0040],
    },
    {
        name: 'Event 5',
        location: 'Location 5',
        category: 'private',
        people: 25,
        type: 'birthday',
        link: '/events/5',
        limit: 50,
        coordinates: [40.7128, -74.0090],
    },
    {
        name: 'Event 6',
        location: 'Location 6',
        category: 'private',
        people: 25,
        type: 'birthday',
        link: '/events/6',
        limit: 50,
        coordinates: [40.7148, -74.0120],
    },
    {
        name: 'Event 7',
        location: 'Location 7',
        category: 'private',
        people: 25,
        type: 'birthday',
        link: '/events/7',
        limit: 50,
        coordinates: [40.7158, -74.0040],
    },
    {
        name: 'Event 8',
        location: 'Location 7t',
        category: 'public',
        people: 10,
        type: 'birthday',
        link: '/events/8',
        limit: 20,
        coordinates: [40.7178, -74.0090],
    },
] as Event[];


export default function EventsMapPage() {
    return (
        <EventsSidebar events={events} />
    );
}