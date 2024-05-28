import { Typography, Textarea, Button } from '@material-tailwind/react'
import InputWithLabel from '../inputs/InputWithLabel'
import DatePicker from '../inputs/DatePicker'
import { Form } from 'react-router-dom'
import { LatLngExpression } from 'leaflet'

function EventCreationFrom({ tabName, location, locationData }: { tabName: string, location: string, locationData: LatLngExpression }) {
    const changingForm = {
        'public': (<InputWithLabel
            label="Event Location"
            color="gray"
            size="lg"
            placeholder="Ukraine, Kyiv"
            name="location"
            value={location}
            readOnly
            containerProps={{
                className: "min-w-full",
            }}
        />),
        'paid': (<div className="grid grid-cols-2 gap-4">
            <InputWithLabel
                label="Event Location"
                color="gray"
                size="lg"
                placeholder="Ukraine, Kyiv"
                name="location"
                value={location}
                readOnly
                containerProps={{
                    className: "min-w-full",
                }}
            />
            <InputWithLabel
                label="Event Price"
                color="gray"
                size="lg"
                type="number"
                placeholder="$20-30"
                name="price"
                containerProps={{
                    className: "!min-w-full",
                }}
            />
        </div>),
        'private': (
            <InputWithLabel
                label="Event Location"
                color="gray"
                size="lg"
                placeholder="Ukraine, Kyiv"
                name="location"
                value={location}
                readOnly
            >
                <Button
                    variant='outlined'
                    size="md"
                    placeholder="Last Name"
                    name="last-name"
                    className="focus:!border-gray-900 !border-blue-gray-200"
                    onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                >
                    Invite
                </Button>
            </InputWithLabel>),
    }
    return (
        <Form method='POST'>
            <input type="text" className='hidden' value={tabName} readOnly name='type' />
            <input type="text" className='hidden' value={locationData.toString()} readOnly name='locationLatLng' />
            <div className="grid grid-cols-2 gap-4">
                <InputWithLabel
                    label="Event Name"
                    color="gray"
                    size="lg"
                    placeholder="First Name"
                    name="title"
                    containerProps={{
                        className: "min-w-full",
                    }}
                />
                <InputWithLabel
                    label="Event Type"
                    color="gray"
                    size="lg"
                    placeholder="Super Party"
                    name="event-type"
                    containerProps={{
                        className: "!min-w-full",
                    }}
                />
            </div>
            <DatePicker />
            {changingForm[tabName as keyof typeof changingForm]}
            <div>
                <Typography
                    variant="small"
                    className="mb-2 text-left font-medium !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                    Event Description
                </Typography>
                <Textarea
                    rows={3}
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