import EventsMap from "../components/elements/EventsMap";
import EventsSidebar from "../components/elements/EventsSidebar";


export default function EventsPage() {
    return (
        <div className='flex flex-1'>
            <EventsMap />
            <EventsSidebar />
        </div>
    );
}