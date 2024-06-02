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

*/

export interface Event {
    id: string;
    title: string;
    description: string;
    locationName: string;
    availability: string;
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
                        x: event.location.x,
                        y: event.location.y,
                        //x: 40.7178,
                        //y: -74.0090,
                    },
                })));

                console.log(data);

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