import { Typography, Textarea, Button } from '@material-tailwind/react'
import InputWithLabel from '../inputs/InputWithLabel'
import DatePicker from '../inputs/DatePicker'

function EventCreationFrom({ tabName, location }: { tabName: string, location: string }) {
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
        <>
            <div className="grid grid-cols-2 gap-4">
                <InputWithLabel
                    label="Event Name"
                    color="gray"
                    size="lg"
                    placeholder="First Name"
                    name="first-name"
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
            {/* <p>
                <label htmlFor="deadline">Deadline</label>
                <input ref={deadline} type="date" name="deadline" id="deadline" />
            </p> */}
            {/* <InputWithLabel
                label="Event Date"
                color="gray"
                size="lg"
                placeholder="30.09.2025"
                type="date"
                name="event-date"
                style={{
                    "::WebkitDatetimeEdit": { padding: "1em" },
                    "::WebkitDatetimeEditFieldsWrapper": { background: "silver" },
                    "::WebkitDatetimeEditText": { color: "red", padding: "0 0.3em" },
                    "::WebkitDatetimeEditMonthField": { color: "blue" },
                    "::WebkitDatetimeEditDayField": { color: "green" },
                    "::WebkitDatetimeEditYearField": { color: "purple" },
                    "::WebkitInnerSpinButton": { display: "none" },
                    "::WebkitCalendarPickerIndicator": { background: "orange" },
                }}
                containerProps={{
                    className: "!min-w-full",

                }}
            /> */}
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
                    placeholder="Message"
                    name="message"
                    className="!border focus:!border-gray-900 !border-blue-gray-200 !ring-0"
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