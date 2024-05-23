import { Typography, Input, Textarea, Button } from '@material-tailwind/react'

function EventCreationFrom({ tabName }: { tabName: string }) {
    const changingForm = {
        'public': (<div>
            <Typography
                variant="small"
                className="mb-2 text-left font-medium !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                Event Location
            </Typography>
            <Input
                color="gray"
                size="lg"
                placeholder="Ukraine, Kyiv, Hryhoriya Skovorody Str, 2"
                name="location"
                className="focus:!border-gray-900 !border-blue-gray-200"
                containerProps={{
                    className: "!min-w-full",
                }}
                labelProps={{
                    className: "hidden",
                }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
        </div>),
        'paid': (<div className="grid grid-cols-2 gap-4">
            <div>
                <Typography
                    variant="small"
                    className="mb-2 text-left font-medium !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                    Event Location
                </Typography>
                <Input
                    color="gray"
                    size="lg"
                    placeholder="Ukraine, Kyiv"
                    name="location"
                    className="focus:!border-gray-900 !border-blue-gray-200"
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
                    Event Price
                </Typography>
                <Input
                    color="gray"
                    size="lg"
                    placeholder="$20-30"
                    name="price"
                    className="focus:!border-gray-900 !border-blue-gray-200"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
            </div>
        </div>),
        'private': (<div className="grid grid-cols-2 gap-4">
            <div className='col-span-2'>
                <Typography
                    variant="small"
                    className="mb-2 text-left font-medium !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                                >
                    Event Location
                </Typography>
                <div className='flex flex-row w-full gap-x-4'>
                    <Input
                        color="gray"
                        size="lg"
                        placeholder="Ukraine, Kyiv, Hryhoriya Skovorody Str, 2"
                        name="location"
                        className="focus:!border-gray-900 !border-blue-gray-200"
                        labelProps={{
                            className: "hidden",
                        }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                    <div>
                        <Button
                            variant='outlined'
                            size="md"
                            placeholder="Last Name"
                            name="last-name"
                            className="focus:!border-gray-900 !border-blue-gray-200 h-full"
                            onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        >Invite</Button>

                    </div>
                </div>
            </div>
        </div>),
    }
    return (
        <>
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
                        className="focus:!border-gray-900 !border-blue-gray-200"
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
                        className="focus:!border-gray-900 !border-blue-gray-200"
                        containerProps={{
                            className: "!min-w-full",
                        }}
                        labelProps={{
                            className: "hidden",
                        }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                </div>
            </div>
            {changingForm[tabName as keyof typeof changingForm]}
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
                    className="focus:!border-gray-900 !border-blue-gray-200 !ring-0"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            </div>
        </>
    )
}

export default EventCreationFrom