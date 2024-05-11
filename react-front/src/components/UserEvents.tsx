import EventsList from "./EventList";

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
    }
];

const UserEvents= () => {
    return (
        <div className="flex border-t border-black">
            <div className="w-1/3 border-r border-black">
                <div className="mb-4">
                    <div className="">Left Content 1</div>
                </div>
                <div>
                    <div className="">Left Content 2</div>
                </div>
            </div>
            <div className="flex-grow pl-4 border-l border-black">
                <div>
                    <EventsList events={eventData} />
                </div>

            </div>
        </div>
    );
}

export default UserEvents;
