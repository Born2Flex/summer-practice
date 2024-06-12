import { Typography, Textarea, Button } from '@material-tailwind/react'
import InputWithLabel from '../inputs/InputWithLabel'
import DatePicker from '../inputs/DatePicker'
import { Form, useLoaderData } from 'react-router-dom'
import { LatLngExpression } from 'leaflet'
import SingleSelectInput from '../inputs/SingleSelectInput'
import ImageInput from '../inputs/ImageInput'
import TimePicker from '../inputs/TimePicker'
import { useState } from 'react'

//EventCreationFrom component, displays the form for creating an event
function EventCreationFrom({ tabName, location, locationData }: { tabName: string, location: string, locationData: LatLngExpression }) {
    const data = useLoaderData() as { eventTypes: any[], currentLocation: LatLngExpression };
    const [date, setDate] = useState<Date>();

    function onDateChange(date: Date) {
        setDate(date);
    }

    let lat, lng;
    if (Array.isArray(locationData)) {
        lat = locationData[0];
        lng = locationData[1];
    } else if (locationData.lat !== undefined && locationData.lng !== undefined) {
        lat = locationData.lat;
        lng = locationData.lng;
    } else {
        throw new Error("Invalid latLngExpression format");
    }

    return (
        <Form method='POST'>
            <input type="text" className='hidden' name="locationX" readOnly value={lat} />
            <input type="text" className='hidden' name="locationY" readOnly value={lng} />
            <input type="text" className='hidden' value={tabName} readOnly name='availability' />
            <input type="text" className='hidden' value={locationData.toString()} readOnly name='locationLatLng' />

            <div className='grid grid-cols-3 gap-x-4'>

                <div className="col-span-2 grid grid-cols-2 gap-x-4">
                    <InputWithLabel
                        label="Event Name"
                        color="gray"
                        size="lg"
                        placeholder="Event Name"
                        name="title"
                        containerProps={{
                            className: "min-w-full",
                        }}
                        required
                    />

                    <SingleSelectInput eventTypes={data.eventTypes} />

                    <DatePicker date={date} setDate={onDateChange} />

                    <TimePicker
                        date={date}
                        label="Event Time"
                        name="event-time"
                        color="gray"
                        size="lg"
                        placeholder="Event Name"
                        containerProps={{
                            className: "min-w-full",
                        }}
                        required
                    />

                    {tabName === 'PAID' && (
                        <InputWithLabel
                            label="Event Price"
                            color="gray"
                            size="lg"
                            type="number"
                            min={0}
                            placeholder="$20-30"
                            name="event-price"
                            containerProps={{
                                className: "!min-w-full",
                            }}
                            required
                        />
                    )}

                    <div className={`${["PUBLIC", "PRIVATE"].includes(tabName) ? 'col-span-2' : undefined}`}>
                        <InputWithLabel
                            label="Event Tags"
                            color="gray"
                            size="lg"
                            placeholder="#event"
                            name="tags"
                            containerProps={{
                                className: "min-w-full",
                            }}
                        />
                    </div>

                </div>
                <ImageInput id={tabName} name="event-image" round={false} />
            </div>

            <div className="grid grid-cols-3 gap-4">

                <InputWithLabel
                    label="Maximal Participants"
                    color="gray"
                    size="lg"
                    type="number"
                    min={1}
                    placeholder="100"
                    name="max-participants"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                />

                <div className='col-span-2'>
                    <InputWithLabel
                        label="Event Location"
                        color="gray"
                        size="lg"
                        placeholder="Ukraine, Kyiv"
                        name="location"
                        value={location}
                        readOnly
                    >
                        {tabName === 'PRIVATE' && (
                            <div>
                                <Button
                                    variant='outlined'
                                    size="md"
                                    className="focus:!border-gray-900 !border-blue-gray-200"
                                    onPointerEnterCapture={undefined}
                                    onPointerLeaveCapture={undefined}
                                    placeholder={undefined}
                                >
                                    Invite
                                </Button>
                            </div>
                        )}
                    </InputWithLabel>
                </div>
            </div>

            <div>
                <Typography
                    variant="small"
                    className="mb-2 text-left font-medium !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                    Event Description
                </Typography>
                <Textarea
                    color="gray"
                    placeholder="Description"
                    name="description"
                    className="!border focus:!border-gray-900 !border-blue-gray-200 !ring-0"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                    labelProps={{
                        className: "hidden",
                    }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
            </div>

            <Button type="submit" className="w-full mt-4" color="gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                Create {tabName} Event
            </Button>
        </Form>
    )
}

export default EventCreationFrom