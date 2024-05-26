import { Button, Typography } from "@material-tailwind/react";
import LocationPicker from "../components/inputs/LocationPicker";
import TabsButtons from "../components/buttons/TabsButtons";
import { useState } from "react";
import { LatLngExpression } from "leaflet";
import { Form, redirect } from "react-router-dom";

const center: LatLngExpression = [50.46458696057009, 30.519340555820754];
// navigator.geolocation.getCurrentPosition((position) => {
//     console.log(position.coords.latitude, position.coords.longitude);
//     center[0] = position.coords.latitude;
//     center[1] = position.coords.longitude;
// });

export function NewEventPage() {
    const [eventLocation, setEventLocation] = useState<LatLngExpression>(center);

    function handleLocationChange(location: LatLngExpression) {
        setEventLocation(_old => location);
    }
    return (
        <div className="z-10 py-2 flex flex-1 justify-center overflow-auto custom-scrollbar bg-gray-50/60">
            <section className="p-8 h-fit self-center w-10/12 bg-gray-50/80 rounded-lg">
                <div className="mx-auto text-center">
                    {/* <Typography
                        variant="h1"
                        color="blue-gray"
                        className="mb-7 !text-3xl lg:!text-4xl" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                        Create New Event!
                    </Typography> */}
                    <div className="grid mx-auto grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">

                        <LocationPicker center={center} onSetLocation={handleLocationChange} />
                        <div>
                            <Typography
                                variant="small"
                                className="text-left !font-semibold !text-gray-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                                Select Event Scope
                            </Typography>
                            {<TabsButtons locationData={eventLocation} />}

                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default NewEventPage;

export async function action({ request }: { request: Request }) {
    const data = await request.formData();
    const searchParams = new URL(request.url).searchParams;
    const type = searchParams.get('type') || 'public';

    let eventData: { [key: string]: string } = {
        type,
    };

    console.log('Creating event with data:', data);
    for (const [key, value] of data.entries()) {
        eventData[key] = value.toString();
    }

    console.log('Gathered event data:', eventData);

    // const response = await fetch('http://localhost:8080/rest/auth/authenticate', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(eventData)
    // });

    // const responseData = await response.text();
    // if (!response.ok) {
    //     console.error(`Error ${response.status}: ${responseData}`);
    //     throw new Error(`Error ${response.status}: ${responseData}`);
    // }

    // console.log('Event created successfully:', responseData);

    return redirect('/events');

}