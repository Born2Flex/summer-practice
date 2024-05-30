import React from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import CommentInputForm from "../forms/CommentInputForm";
import ChatBubble from "./ChatBubble";

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

export function EventSidebarAccordion() {
    const [open, setOpen] = React.useState(1);

    const handleOpen = (value: number) => setOpen(open === value ? 3 - value : value);

    return (
        <div className="flex flex-1 flex-col pb-1">
            <Accordion className={`${open === 1 ? 'flex flex-col flex-1' : undefined}`} open={open === 1} icon={<Icon id={1} open={open} />} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <AccordionHeader onClick={() => handleOpen(1)} className="text-lg font-semibold text-gray-800  border-gray-800" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>About this event</AccordionHeader>
                <AccordionBody className='flex flex-1'>
                    <div className="flex flex-1">
                        We&apos;re not always in the position that we want to be at. We&apos;re constantly
                        growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                        ourselves and actualize our dreams.
                    </div>
                </AccordionBody>
            </Accordion>
            <Accordion className={`${open === 2 ? 'flex flex-col flex-1' : undefined}`} open={open === 2} icon={<Icon id={2} open={open} />} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {open === 2 && <nav className="w-0 h-0"></nav>}
                <AccordionHeader onClick={() => handleOpen(2)} className="text-lg font-semibold text-gray-800 border-gray-800" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    Commentaty section
                </AccordionHeader>
                <AccordionBody className="flex flex-1 flex-col gap-y-1">
                    <div className="flex h-[180px] flex-col gap-y-2 overflow-auto custom-scrollbar">
                        <ChatBubble />
                        <ChatBubble />
                    </div>
                    <CommentInputForm />
                </AccordionBody>
            </Accordion>
        </div>
    );
}