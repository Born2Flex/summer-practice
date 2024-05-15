import React from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";

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
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

    return (
        <>
            <Accordion open={open === 1}
                icon={<Icon id={1} open={open} />}
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            >
                <AccordionHeader
                    onClick={() => handleOpen(1)}
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                >
                    Advanced Search Options
                </AccordionHeader>
                <AccordionBody>
                    We&apos;re not always in the position that we want to be at. We&apos;re constantly
                    growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                    ourselves and actualize our dreams.
                </AccordionBody>
            </Accordion>
        </>
    );
}