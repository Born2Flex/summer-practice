import { Typography } from "@material-tailwind/react";
import LocationPicker from "../components/inputs/LocationPicker";
import TabsButtons from "../components/elements/TabsButtons";
import { useState } from "react";
import { LatLngExpression } from "leaflet";
import { redirect, useLoaderData } from "react-router-dom";

//NewEventPage component, displays the new event page
export function NewEventPage() {
    const data = useLoaderData() as { eventTypes: any[], currentLocation: LatLngExpression };

    const [eventLocation, setEventLocation] = useState<LatLngExpression>(data.currentLocation);

    function handleLocationChange(location: LatLngExpression) {
        console.log('Location changed:', eventLocation, location);
        setEventLocation(_old => location);
    }
    return (
        <div className="z-10 flex flex-1 justify-center overflow-auto custom-scrollbar bg-gray-50/60">
            <section className="flex flex-col lg:flex-row px-8 py-2 gap-6 w-full self-center bg-gray-50/50">

                <LocationPicker center={eventLocation} onSetLocation={handleLocationChange} />

                <div className="w-full text-center lg:w-3/5 items-start">

                    <div>
                        <Typography
                            variant="small"
                            className="text-left !font-semibold !text-gray-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                            Select Event Scope
                        </Typography>
                        {<TabsButtons locationData={eventLocation} />}
                    </div>

                </div>
            </section>
        </div>
    );
}

export default NewEventPage;

//NewEventPage loader function, fetches event types and user location
export async function loader() {
    const token = localStorage.getItem('jwt');
    if (!token) {
        return redirect('/login');
    }
    const baseurl = import.meta.env.VITE_API_URL as string || 'http://localhost:8080';

    try {
        const response = await fetch(`${baseurl}/rest/events/types`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch event types');
        }

        const eventTypes = await response.json();

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

        return {
            eventTypes: eventTypes,
            currentLocation: currentLocation
        };

    } catch (error) {
        console.error('Error fetching events:', error);
        return null;
    }
}

//NewEventPage action function, sends new event data to the server
export async function action({ request }: { request: Request }) {
    const data = await request.formData();

    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error('No JWT token found');
    }

    const eventDate: string | undefined = data.get('event-date')?.toString();
    const eventTime: string | undefined = data.get('event-time')?.toString();
    let isoDateString: string | undefined;

    if (eventDate && eventTime) {
        console.log('Event date and time:', eventDate, eventTime);

        const [year, month, day] = eventDate.split('-');
        const [hours, minutes] = eventTime.split(':');

        const date = new Date(Date.UTC(
            parseInt(year),
            parseInt(month) - 1,
            parseInt(day),
            parseInt(hours),
            parseInt(minutes)
        ));

        const timezoneOffsetMs = new Date().getTimezoneOffset() * 60000;
        const adjustedDate = new Date(date.getTime() - timezoneOffsetMs);

        isoDateString = adjustedDate.toISOString().replace('Z', '');

        console.log('Combined ISO date string:', isoDateString);
    }

    let eventData: any;

    eventData = {
        title: data.get('title')?.toString(),
        description: data.get('description')?.toString(),
        availability: data.get('availability')?.toString(),
        maxParticipants: Number(data.get('max-participants')) || null,
        entranceFee: Number(data.get('event-price')) || null,
        eventType: data.get('event-type'),
        locationName: data.get('location'),
        tags: data.get('tags')?.toString().split(',').map((tag: string) => tag.trim()) || [],

        location: {
            x: parseFloat(data.get('locationX')?.toString() || '0'),
            y: parseFloat(data.get('locationY')?.toString() || '0')
        },
        startDateTime: isoDateString,
        imgUrl: data.get('event-image') || null
    };

    console.log('Gathered event data:', eventData);
    const baseurl = import.meta.env.VITE_API_URL as string || 'http://localhost:8080';

    const response = await fetch(`${baseurl}/rest/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
    });

    const responseData = await response.json();
    if (!response.ok) {
        console.error(`Error ${response.status}: ${responseData}`);
        throw new Error(`Error ${response.status}: ${responseData}`);
    }

    console.log('Event created successfully:', responseData);

    return redirect('/events');

}