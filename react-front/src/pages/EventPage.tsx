import { redirect, useRouteLoaderData } from "react-router-dom";
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

    const event = useRouteLoaderData(':id') as Event;

    console.log(event);
    return (
        <EventSidebar {...event} />
    );
}

export async function loader({ request }: { request: Request }) {
    const token = getToken();
    if (!token) {
        return redirect('/login');
    }

    const url = new URL(request.url);
    const pathComponents = url.pathname.split('/');
    const id = pathComponents[pathComponents.length - 1];

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

        /*const event = await response.json();

        return await new Promise<Event>((resolve, reject) => {
            try {
                event.startDateTime = localDateTimeString(event.startDateTime);
                console.log(event);
                resolve(event);
            } catch (error) {
                console.error('Error processing event date:', error);
                reject(error);
            }
        });*/

        const event = await new Promise<Event>((resolve, reject) => {
            response.json().then((data: Event) => {
                // Transform the startDateTime and resolve the event
                data.startDateTime = localDateTimeString(data.startDateTime);
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
