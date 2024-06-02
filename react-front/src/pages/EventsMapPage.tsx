import { LatLngExpression } from "leaflet";
import EventsSidebar from "../components/sections/EventsSidebar";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { useEventsContext } from "../context/EventsProvider";

/*export interface Event {
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
] as Event[];*/

export interface Event {
    id: string;
    title: string;
    description: string;
    locationName: string;
    availability:string;
    eventType: string;
    currentParticipants: number;
    maxParticipants: number;
    entranceFee?: number;
    location: {
        x: number;
        y: number;
    };
}

export default function EventsMapPage() {
    const { login } = useAuth();
    login();

    //const [events, setEvents] = useState<Event[]>([]);
    const { events, setEvents } = useEventsContext();

    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem('jwt');
            if (!token) {
                throw new Error('No JWT token found');
            }

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
                setEvents(data.map((event: any) => ({
                    id: event.id,
                    title: event.title,
                    description: event.description,
                    locationName: event.locationName,
                    availability: event.availability,
                    eventType: event.eventType,
                    currentParticipants: event.currentParticipants,
                    maxParticipants: event.maxParticipants,
                    entranceFee: event.entranceFee,
                    location: {
                        //x: event.location.x,
                        //y: event.location.y,
                        x: 40.7178,
                        y: -74.0090,
                    },
                })));

            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);


    return (
        <EventsSidebar events={events} />
    );
}