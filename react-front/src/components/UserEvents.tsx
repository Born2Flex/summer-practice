import { useState } from "react";
import EventsList from "./EventList";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
                    <div className="">Left Content 2</div>
                </div>
            </div>
            <div className="border-l border-black overflow-y-auto">
                <EventsList events={eventData} />
            </div>
        </div>
    );
}

export default UserEvents;
