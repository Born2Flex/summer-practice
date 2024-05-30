import { Button } from "@material-tailwind/react";
import { NavLink, useParams } from "react-router-dom";
import Sponsors from "../components/cards/Sponsors";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import EventSidebar from "../components/sections/EventSidebar";
import { Event } from "./EventsMapPage";

function EventPage() {
    const { id } = useParams();
    const event = {
        name: 'Event 8',
        location: 'Location 7t',
        category: 'public',
        people: 10,
        type: 'birthday',
        link: '/events/8',
        limit: 20,
        coordinates: [40.7178, -74.0090],
    } as Event;

    return (
        <EventSidebar {...event} />
    );
}

export default EventPage;
