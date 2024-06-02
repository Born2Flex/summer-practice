import React, { useState } from "react";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import CommentInputForm from "../forms/CommentInputForm";
import ChatBubble from "./ChatBubble";
import Pic1 from "../../assets/photo_2024-05-30_16-20-27.jpg";
import Pic2 from "../../assets/photo_2024-05-30_16-20-59.jpg";
import Pic3 from "../../assets/photo_2024-05-30_16-21-05.jpg";
import Pic4 from "../../assets/photo_2024-05-30_16-21-10.jpg";
import Pic5 from "../../assets/photo_2024-05-30_16-21-17.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Comment } from "../../pages/EventPage";
import { faLightbulb, faLocationDot } from "@fortawesome/free-solid-svg-icons";

const comments = [
    {
        image: Pic1,
    },
    {
        image: Pic2,
    },
    {
        image: Pic3,
    },
    {
        image: Pic4,
    },
    {
        image: Pic5,
    },
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

export function EventSidebarAccordion({ id, description, locationName, currentParticipants, maxParticipants, eventComments }: { id: string, description: string, locationName: string, currentParticipants: number, maxParticipants: number | null, eventComments: Comment[] }) {
    const [open, setOpen] = React.useState(1);

    const [stateComments, setComments] = useState(eventComments);

    const handleOpen = (value: number) => setOpen(open === value ? 3 - value : value);

    const renderParticipantCount = () => {
        return maxParticipants !== null
            ? `${currentParticipants}/${maxParticipants} people`
            : `${currentParticipants} people`;
    };

    const handleCommentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const token = localStorage.getItem('jwt');
        if (!token) {
            throw new Error('No JWT token found');
        }

        const formData = new FormData(event.currentTarget);
        const newCommentText = formData.get('comment') as string;

        try {
            const response = await fetch(`http://localhost:8080/rest/events/${id}/comment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: `"${newCommentText.trim()}"`
            });

            if (response.ok) {
                const newCommentFromServer = await response.json();
                console.log(newCommentFromServer);
                setComments([...stateComments, newCommentFromServer]);
            } else {
                console.error('Failed to add comment');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="flex flex-1 flex-col pb-1.5">
            <Accordion className={`${open === 1 ? 'flex flex-col flex-1' : undefined}`} open={open === 1} icon={<Icon id={1} open={open} />} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <AccordionHeader onClick={() => handleOpen(1)} className="text-lg font-semibold text-gray-800  border-gray-800" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>About this event</AccordionHeader>
                <AccordionBody className='flex flex-1 flex-col gap-y-6'>
                    {/*<div>
                        We&apos;re not always in the position that we want to be at. We&apos;re constantly
                        growing. We&apos;re constantly making mistakes. We&apos;re constantly trying to express
                        ourselves and actualize our dreams.
                    </div>*/}
                    <div className="max-h-[80px] overflow-y-auto custom-scrollbar">
                        {description}
                    </div>
                    <div className="flex flex-1 justify-between px-2">
                        <div className="flex flex-col w-[133px] text-center px-6 py-4 rounded-lg bg-white/40">
                            <span className="font-bold text-gray-900">
                                Participants:
                            </span>
                            <span className="text-xs">
                                {renderParticipantCount()}
                            </span>

                            <div className='mt-3 flex items-center justify-center gap-2'>
                                {comments.slice(0, 4).map((comment, index) => (
                                    <div
                                        key={index}
                                        className={`relative overflow-hidden rounded-full ${index !== 0 ? "-ml-5" : ""}`}
                                        style={{ width: '24px', height: '24px' }}
                                    >
                                        <img
                                            src={comment.image}
                                            alt={`user_${index}`}
                                            className='rounded-full object-cover'
                                        />
                                    </div>

                                ))}
                                {comments.length > 4 && (
                                    <div
                                        className='relative flex justify-center items-center overflow-hidden rounded-full -ml-5 bg-gray-500 border border-gray-900'
                                        style={{ width: '24px', height: '24px' }}
                                    >
                                        <span className="text-gray-200 text-xs font-thin">
                                            +{comments.length - 4}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <a href="#" className="mt-2">
                                <span className="text-xs text-gray-500 underline">View all</span>
                            </a>
                        </div>

                        <div className="flex flex-col justify-between text-center w-[160px] px-6 py-4 rounded-lg bg-white/40">
                            <span className="font-bold text-gray-900">
                                Details:
                            </span>
                            <div>
                                <p className="text-sm">
                                    <FontAwesomeIcon icon={faLocationDot} className="text-gray-600 w-4 h-4" />
                                    <span className="ml-1 text-gray-600">{locationName}</span>
                                </p>
                                <p className="text-sm">
                                    <FontAwesomeIcon icon={faLightbulb} className="text-gray-600" />
                                    <span className="ml-1 text-gray-600">Food, Drinks, Music</span>
                                </p>
                            </div>
                            <a href="#">
                                <span className="text-xs text-gray-500 underline">View all</span>
                            </a>
                        </div>
                    </div>

                </AccordionBody>
            </Accordion>
            <Accordion className={`${open === 2 ? 'flex flex-col flex-1' : undefined}`} open={open === 2} icon={<Icon id={2} open={open} />} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {open === 2 && <nav className="w-0 h-0"></nav>}
                <AccordionHeader onClick={() => handleOpen(2)} className="text-lg font-semibold text-gray-800 border-gray-800" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                    Comment section
                </AccordionHeader>
                <AccordionBody className="flex flex-1 flex-col gap-y-1">
                    <div className="flex h-[180px] flex-col gap-y-2 overflow-auto custom-scrollbar">
                        <ChatBubble />
                        <ChatBubble />
                    </div>
                    <CommentInputForm onSubmit={handleCommentSubmit} />
                </AccordionBody>
            </Accordion>
        </div>
    );
}