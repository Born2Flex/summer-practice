import { Button, ButtonGroup, Input, Textarea, Typography } from "@material-tailwind/react";
// import type { ButtonStyleTypes } from "@material-tailwind/react";
import MapImage from "../assets/map.png";

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
                    <div className="grid w-10/12 mx-auto grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
                        <img
                            src={MapImage}
                            alt="map"
                            className="w-full h-full lg:max-h-[510px]"
                        />
                        <form
                            action="#"
                            className="flex flex-col gap-4"
                        >
                            <Typography
                                variant="small"
                                className="text-left !font-semibold !text-gray-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                        >
                                Select Event Scope
                            </Typography>
                            <ButtonGroup fullWidth placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <Button placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Public</Button>
                                <Button placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Private</Button>
                                <Button placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Paid</Button>
                            </ButtonGroup>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Typography
                                        variant="small"
                                        className="mb-2 text-left font-medium !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                        Event Name
                                    </Typography>
                                    <Input
                                        color="gray"
                                        size="lg"
                                        placeholder="First Name"
                                        name="first-name"
                                        className="focus:!border-t-gray-900"
                                        containerProps={{
                                            className: "min-w-full",
                                        }}
                                        labelProps={{
                                            className: "hidden",
                                        }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                                </div>
                                <div>
                                    <Typography
                                        variant="small"
                                        className="mb-2 text-left font-medium !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                                        Event Type
                                    </Typography>
                                    <Input
                                        color="gray"
                                        size="lg"
                                        placeholder="Last Name"
                                        name="last-name"
                                        className="focus:!border-t-gray-900"
                                        containerProps={{
                                            className: "!min-w-full",
                                        }}
                                        labelProps={{
                                            className: "hidden",
                                        }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                                </div>
                            </div>
                            <div>
                                <Typography
                                    variant="small"
                                    className="mb-2 text-left font-medium !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                    Event Location
                                </Typography>
                                <Input
                                    color="gray"
                                    size="lg"
                                    placeholder="name@email.com"
                                    name="email"
                                    className="focus:!border-t-gray-900"
                                    containerProps={{
                                        className: "!min-w-full",
                                    }}
                                    labelProps={{
                                        className: "hidden",
                                    }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                            </div>
                            <div>
                                <Typography
                                    variant="small"
                                    className="mb-2 text-left font-medium !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                    Event Description
                                </Typography>
                                <Textarea
                                    rows={6}
                                    color="gray"
                                    placeholder="Message"
                                    name="message"
                                    className="focus:!border-t-gray-900 !ring-0"
                                    containerProps={{
                                        className: "!min-w-full",
                                    }}
                                    labelProps={{
                                        className: "hidden",
                                    }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                            </div>
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