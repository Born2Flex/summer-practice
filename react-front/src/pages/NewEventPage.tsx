import { Button, Typography } from "@material-tailwind/react";
// import type { ButtonStyleTypes } from "@material-tailwind/react";
import LocationPicker from "../components/inputs/LocationPicker";
import TabsButtons from "../components/buttons/TabsButtons";

export function NewEventPage() {
    return (
        <div className="z-10 py-2 flex flex-1 justify-center overflow-auto custom-scrollbar bg-gray-50/60">
            <section className="px-8 py-8 h-fit bg-gray-50/80 rounded-lg">
                <div className="container mx-auto text-center">
                    <Typography
                        variant="h1"
                        color="blue-gray"
                        className="mb-7 !text-3xl lg:!text-4xl" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                >
                        Create New Event!
                    </Typography>
                    {/* <Typography className="mb-10 font-normal !text-lg lg:mb-12 mx-auto max-w-3xl !text-gray-500" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Plan yur new awesome event with us! Fill in the form below and we will do the rest for you.
                    </Typography> */}
                    <div className="grid w-11/12 mx-auto grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">

                        <LocationPicker />
                        <form
                            action="#"
                            className="flex flex-col gap-4"
                        >
                            <Typography
                                variant="small"
                                className="text-left !font-semibold !text-gray-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                                Select Event Scope
                            </Typography>
                            <TabsButtons />

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