import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Typography,
} from "@material-tailwind/react";
import { RangeKeyDict, DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useState } from 'react';
import InputWithLabel from "../inputs/InputWithLabel";
import SelectInput from "../inputs/SelectInput";

const event_categories = [
    { value: 'public', label: 'Public' },
    { value: 'paid', label: 'Paid' },
    { value: 'private', label: 'Private' },
]

function Icon({ id, open }: { id: number; open: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
    );
}

export default function SearchDetailsForm({ eventTypes }: { eventTypes: string[] }) {
    console.log(eventTypes);
    const structuredTypes = eventTypes.map((type) => ({ value: type, label: type.toUpperCase() }));
    const [open, setOpen] = useState(0);
    const [range, setRange] = useState([
        {
            startDate: undefined as unknown as Date,
            endDate: undefined as unknown as Date,
            key: 'selection'
        }
    ]);

    function setDateRange(item: RangeKeyDict) {
        setRange([{
            startDate: item.selection.startDate as Date,
            endDate: item.selection.endDate as Date,
            key: item.selection.key as string
        }]);
    }

    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

    return (
        <>
            <Accordion
                open={open === 1}
                icon={<Icon id={1} open={open} />}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                className={(open === 1 ? "bg-green-50 p-4 rounded-lg shadow-md open:bg-black" : "bg-green-100/50 p-4 rounded-lg")}
                style={{ transition: "all 0.5s" }}
            >
                <AccordionHeader
                    onClick={() => handleOpen(1)}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                    className="text-base py-2"
                >
                    Advanced Search Options
                </AccordionHeader>
                <AccordionBody
                    className='flex flex-col max-h-72 pr-2 overflow-y-auto custom-scrollbar'
                >
                    <div className="flex flex-col gap-4 mb-4 max-w-[332px]">
                        <SelectInput name="event-type" options={structuredTypes} />

                        <SelectInput name="event-category" options={event_categories} />
                    </div>

                    <div>
                        <Typography
                            variant="small"
                            className="mb-2 block text-left font-semibold text-gray-900"
                            placeholder={undefined}
                            onPointerEnterCapture={undefined}
                            onPointerLeaveCapture={undefined}>
                            Pick Event Date Span
                        </Typography>
                        <input name='from' value={range[0].startDate?.toDateString() ?? ''} readOnly className="hidden" />
                        <input name='to' value={range[0].endDate?.toDateString() ?? ''} readOnly className="hidden" />
                        {/* <DateRangePicker
                            onChange={setDateRange}
                            moveRangeOnFirstSelection={false}
                            className="w-full rounded-lg"
                            months={1}
                            ranges={range}
                            rangeColors={['#0e9f6e']}
                            direction="horizontal"
                        /> */}
                        <DateRange
                            className="rounded-lg"
                            minDate={new Date()}
                            rangeColors={['#0e9f6e']}
                            editableDateInputs={true}
                            onChange={setDateRange}
                            moveRangeOnFirstSelection={false}
                            ranges={range}
                        />
                    </div>

                    <div className="pt-4">
                        <InputWithLabel
                            label="Event Distance Radius (km)"
                            color="gray"
                            size="lg"
                            type="number"
                            min={1}
                            placeholder="150"
                            name="event-distance"
                        />
                    </div>


                </AccordionBody>
            </Accordion>
        </>
    );
}