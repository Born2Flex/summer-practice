import { Button, Typography } from "@material-tailwind/react";
import LocationPicker from "../components/inputs/LocationPicker";
import TabsButtons from "../components/buttons/TabsButtons";
import { useState } from "react";
import { LatLngExpression } from "leaflet";

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
            <section className="px-8 py-8 h-fit w-10/12 bg-gray-50/80 rounded-lg">
                <div className="container mx-auto text-center">
                    {/* <Typography
                        variant="h1"
                        color="blue-gray"
                        className="mb-7 !text-3xl lg:!text-4xl" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                        Create New Event!
                    </Typography> */}
                    <div className="grid w-11/12 mx-auto grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">

                        <div className="flex flex-col w-full h-full text-center">
                            {/* <Typography
                                variant="h3"
                                color="blue-gray"
                                className="mb-7 !text-3xl lg:!text-4xl" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                                Pick a location for your event!
                            </Typography> */}
                            <LocationPicker center={center} onSetLocation={handleLocationChange} />
                        </div>
                        <form
                            action="#"
                            className="flex flex-col justify-between"
                        >
                            <Typography
                                variant="small"
                                className="text-left !font-semibold !text-gray-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                                Select Event Scope
                            </Typography>
                            {<TabsButtons locationData={eventLocation} />}

                            <Button className="w-full" color="gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                Create Event
                            </Button>
                        </form>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default NewEventPage;