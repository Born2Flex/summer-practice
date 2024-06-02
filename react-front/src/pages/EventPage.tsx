import { useParams } from "react-router-dom";
import EventSidebar from "../components/sections/EventSidebar";
import { useEffect, useState } from "react";

interface Host {
    id: string;
    firstName: string;
    lastName: string;
    imgUrl: string;
}

interface Location {
    x: number;
    y: number;
}

interface User {
    id: string;
    firstName: string;
    lastName: string;
    imgUrl: string;
}

export interface Comment {
    id: string;
    text: string;
    user: User;
}

export interface Event {
    id: string;
    title: string;
    host: Host;
    availability: string;
    currentParticipants: number;
    maxParticipants: number | null;
    entranceFee: number | null;
    eventType: string;
    description: string;
    locationName: string;
    location: Location;
    startDateTime: string;
    comments: Comment[];
    tags: string[];
    imgUrl: string | null;
    participants: any[];
}

const localDateTimeString = (utcDateTimeString: string): string => {
    const utcDate = new Date(utcDateTimeString);
    const localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
    return localDate.toISOString().split('T')[0] + ' ' + localDate.toTimeString().split(' ')[0];
};

function EventPage() {
    console.log('EventPage useEffect');
    const { id } = useParams();
    //console.log(id);
    /*const event = {
        name: 'Event 8',
        location: 'Location 7t',
        category: 'public',
        people: 10,
        type: 'birthday',
        link: '/events/8',
        limit: 20,
        coordinates: [40.7178, -74.0090],
    } as Event;*/

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchEvents = async () => {
            const token = localStorage.getItem('jwt');
            if (!token) {
                throw new Error('No JWT token found');
            }

            try {
                const response = await fetch(`http://localhost:8080/rest/events/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }

                const eventData = await response.json();
                const event: Event = {
                    id: eventData.id,
                    title: eventData.title,
                    host: eventData.host,
                    availability: eventData.availability,
                    currentParticipants: eventData.currentParticipants,
                    maxParticipants: eventData.maxParticipants,
                    entranceFee: eventData.entranceFee,
                    eventType: eventData.eventType,
                    description: eventData.description,
                    locationName: eventData.locationName,
                    location: eventData.location,
                    startDateTime: localDateTimeString(eventData.startDateTime),
                    comments: eventData.comments,
                    imgUrl: eventData.imgUrl,
                    tags: eventData.tags,
                    participants: eventData.participants,
                };
                console.log(event);
                setEvent(event);

            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [id]);


    // Styled loader needed
    if (loading) {
        return <div>Loading...</div>;
    }

    if (!event) {
        return <div>No event found</div>;
    }

    return (
        <EventSidebar {...event} />
    );
}

export default EventPage;
