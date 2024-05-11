import EventInfo from './EventInfo';

interface EventData {
    name: string;
    description: string;
    avatarUrl: string;
}

interface EventsListProps {
    events: EventData[];
}

const EventsList = ({ events }: EventsListProps) => {
    return (
        <div>
            {events.map((event, index) => (
                <EventInfo
                    key={index}
                    name={event.name}
                    description={event.description}
                    avatarUrl={event.avatarUrl}
                />
            ))}
        </div>
    );
}

export default EventsList;
