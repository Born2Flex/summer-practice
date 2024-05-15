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
                className={(open === 1 ? "bg-green-50 p-4 rounded-lg shadow-md" : "bg-green-100/50 p-4 rounded-lg")}
                style={{ transition: "background-color 0.3s" }}
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
                <AccordionBody>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa nemo voluptas ad ut, omnis, neque quisquam provident reiciendis, corrupti repudiandae debitis harum est sit voluptatibus. Fugit error magni, harum a soluta, veritatis fuga doloremque esse velit voluptatem ipsa architecto praesentium recusandae in voluptatum debitis ullam! Ipsa libero vitae laudantium necessitatibus possimus distinctio similique nisi maiores placeat! Itaque nostrum magnam, consequatur, sed nulla, sit laborum obcaecati minima repellat necessitatibus numquam eveniet?
                </AccordionBody>
            </Accordion>
        </>
    );
}