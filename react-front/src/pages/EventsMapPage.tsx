import EventsSidebar from "../components/sections/EventsSidebar";
import { useRouteLoaderData } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
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

    const events = useRouteLoaderData('map-layout') as Event[];

    return (
        <EventsSidebar events={events} />
    );
}