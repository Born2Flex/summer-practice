import EventInfo from './EventInfo';

interface EventData {
    name: string;
    host: string;
    date: string;
    place: string
    description: string;
    avatarUrl: string;
}

interface EventsListProps {
    events: EventData[];
}

const EventsList = ({ events }: EventsListProps) => {
    return (
        <div className='h-fit'>
            {events.map((event, index) => (
                <EventInfo
                    key={index}
                    name={event.name}
                    host={event.host}
                    place={event.place}
                    date={event.date}
                    description={event.description}
                    avatarUrl={event.avatarUrl}
                />
            ))}
        </div>
    );
}

export default EventsList;
