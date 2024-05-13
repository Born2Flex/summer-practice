import { useState } from "react";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import EventsList from "./EventList";
import Calendar from 'react-calendar';
//import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
import DropList from "./DropList";

const eventData = [
    {
        name: "Tech Conference 2024",
        host: "Tech Events Inc.",
        date: "2024-06-15",
        place: "Convention Center",
        description: "Join us for the biggest tech conference of the year! Explore the latest trends in AI, blockchain, and more.",
        avatarUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        name: "Art Exhibition: Modern Masterpieces",
        host: "Art Gallery Ltd.",
        date: "2024-07-20",
        place: "Downtown Art Center",
        description: "Discover stunning modern artworks by renowned artists from around the world.",
        avatarUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        name: "Music Festival: Summer Sounds 2024",
        host: "Sound Productions",
        date: "2024-08-10",
        place: "City Park Amphitheater",
        description: "Get ready for a day of live music performances featuring top artists across genres!",
        avatarUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        name: "Music Festival: Summer Sounds 2024",
        host: "Sound Productions",
        date: "2024-08-10",
        place: "City Park Amphitheater",
        description: "Get ready for a day of live music performances featuring top artists across genres!",
        avatarUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        name: "Music Festival: Summer Sounds 2024",
        host: "Sound Productions",
        date: "2024-08-10",
        place: "City Park Amphitheater",
        description: "Get ready for a day of live music performances featuring top artists across genres!",
        avatarUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    }
];

const sortingOptions = ['Order A-Z', 'Order Z-A', 'Order by date asc', 'Order by date desc'];
const categories = ['All categories', 'Concerts', 'Art galleries', 'Bazaar'];
const types = ['All', 'Hosted by me', 'Subscribed'];

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const UserEvents= () => {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div className="relative flex flex-row">
            <div className="w-[30%] h-full border-r border-black">
                <div className="mb-4 w-full border-b border-black">
                    <Calendar onChange={onChange} value={value} />
                </div>
                <div className="inline-block w-full">
                        <DropList items={sortingOptions}
                            className='flex relative items-center justify-center mb-2 rounded-full p-4 w-fit h-fit bg-[#1BB8DA] text-white text-xl'
                        />
                        <DropList items={categories}
                            className='flex relative items-center justify-center mb-2 rounded-full p-4 w-fit h-fit bg-[#1BB8DA] text-white text-xl'
                        />
                        <DropList items={types}
                            className='flex relative items-center justify-center mb-2 rounded-full p-4 w-fit h-fit bg-[#1BB8DA] text-white text-xl'
                        />
                </div>
            </div>
            <div className="absolute ml-[30%] overflow-y-scroll h-full">
                <EventsList events={eventData} />
            </div>
        </div>
    );
}

export default UserEvents;
