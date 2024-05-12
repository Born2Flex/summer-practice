import { useState } from "react";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import EventsList from "./EventList";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import DropList from "./DropList";

const eventData = [
    {
        name: "Event 1",
        description: "Description of Event 1",
        avatarUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        name: "Event 2",
        description: "Description of Event 2",
        avatarUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        name: "Event 3",
        description: "Description of Event 3",
        avatarUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        name: "Event 4",
        description: "Description of Event 4",
        avatarUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
    {
        name: "Event 5",
        description: "Description of Event 5",
        avatarUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
    },
];

// const menuItems = ['Home', 'Profile', 'Settings', 'Settings', 'Settings', 'Settings'];
const sortingOptions = ['Order A-Z', 'Order Z-A', 'Order by date asc', 'Order by date desc'];
const categories = ['All categories', 'Concerts', 'Art galleries', 'Bazaar'];
const types = ['All', 'Hosted by me', 'Subscribed'];

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const UserEvents= () => {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <div className="flex flex-1 border-t h-full border-black">
            <div className="w-1/3 h-full">
                <div className="mb-4">
                    <div className="">
                        <Calendar onChange={onChange} value={value} />
                    </div>
                </div>
                <div>
                    <div className="inline-block">
                        <DropList buttonIcon={faBars} items={sortingOptions}
                            className='flex relative items-center justify-center mb-2 rounded-full p-4 w-fit h-fit bg-[#1BB8DA] text-white text-xl'
                        />
                        <DropList buttonIcon={faBars} items={categories}
                            className='flex relative items-center justify-center mb-2 rounded-full p-4 w-fit h-fit bg-[#1BB8DA] text-white text-xl'
                        />
                        <DropList buttonIcon={faBars} items={types}
                            className='flex relative items-center justify-center mb-2 rounded-full p-4 w-fit h-fit bg-[#1BB8DA] text-white text-xl'
                        />
                    </div>
                </div>
            </div>
            <div className="border-l border-black overflow-y-auto">
                <EventsList events={eventData} />
            </div>
        </div>
    );
}

export default UserEvents;
