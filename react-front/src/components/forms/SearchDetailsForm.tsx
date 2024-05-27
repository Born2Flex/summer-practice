import {
    Accordion,
    AccordionHeader,
    AccordionBody,
    Typography,
} from "@material-tailwind/react";
import { DateRangePicker, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useState } from 'react';
import InputWithLabel from "../inputs/InputWithLabel";
import SelectInput from "../inputs/SelectInput";

const event_types = [
    { value: 'party', label: 'Party' },
    { value: 'birthday', label: 'Birthday' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'meeting', label: 'Meeting' },
]

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

export default function SearchDetailsForm() {
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
                {open == 1 && <nav className="w-0 h-0"></nav>}
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
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <SelectInput name="event-type" options={event_types} />

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
                        <DateRangePicker
                            onChange={setDateRange}
                            moveRangeOnFirstSelection={false}
                            className="w-full rounded-lg"
                            months={1}
                            ranges={range}
                            rangeColors={['#0e9f6e']}
                            direction="horizontal"
                        />
                    </div>

                    <div className="pt-4">
                        <InputWithLabel
                            label="Event Distance Radius (km)"
                            color="gray"
                            size="lg"
                            type="number"
                            placeholder="150"
                            name="event-distance"
                        />
                    </div>


                </AccordionBody>
            </Accordion>
        </>
    );
}