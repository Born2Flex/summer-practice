import { redirect, useLoaderData } from "react-router-dom";
import EventSidebar from "../components/sections/EventSidebar";
import { getToken } from "../auth";

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

    const event = useLoaderData() as Event;

    console.log("EVENT:", event);
    return (
        <EventSidebar {...event} />
    );
}

export async function loader({ params }: { params: any }) {
    const token = getToken();
    if (!token) {
        return redirect('/login');
    }

    const id = params.id;
    console.log(id);

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

        const event = await new Promise<Event>((resolve, reject) => {
            response.json().then((data: Event) => {
                // Transform the startDateTime and resolve the event
                data.startDateTime = localDateTimeString(data.startDateTime);
                console.log("DATA:", data);
                resolve(data);
            }).catch((error) => {
                console.error('Error processing event data:', error);
                reject(error);
            });
        });
        console.log(event);
        return event;

    } catch (error) {
        console.error('Error fetching events:', error);
        return null;
    }
};

export default EventPage;
