import useHorizontalScroll from '../../hooks/useHorizontalScroll';
import EventCard from '../cards/EventCard'
import { Event } from '../../pages/EventsMapPage'

const events = [
    {
        id: '123',
        title: 'Party',
        description: 'Party at the beach',
        locationName: 'Beach',
        availability: 'PUBLIC',
        eventType: 'PARTY',
        currentParticipants: 5,
        maxParticipants: 10,
        entranceFee: 10,
        location: {
            x: 0,
            y: 0,
        }
    },
    {
        id: '456',
        title: 'Concert',
        description: 'Live concert at the stadium',
        locationName: 'Stadium',
        availability: 'PUBLIC',
        eventType: 'CONCERT',
        currentParticipants: 8,
        maxParticipants: 15,
        entranceFee: 20,
        location: {
            x: 10,
            y: 20,
        }
    },
    {
        id: '789',
        title: 'Conference',
        description: 'Tech conference at the convention center',
        locationName: 'Convention Center',
        availability: 'PUBLIC',
        eventType: 'CONFERENCE',
        currentParticipants: 3,
        maxParticipants: 50,
        entranceFee: 0,
        location: {
            x: 30,
            y: 40,
        }
    },
    {
        id: '101112',
        title: 'Workshop',
        description: 'Hands-on workshop for beginners',
        locationName: 'Community Center',
        availability: 'PUBLIC',
        eventType: 'WORKSHOP',
        currentParticipants: 12,
        maxParticipants: 20,
        entranceFee: 5,
        location: {
            x: 50,
            y: 60,
        }
    },
    {
        id: '131415',
        title: 'Exhibition',
        description: 'Art exhibition at the gallery',
        locationName: 'Art Gallery',
        availability: 'PUBLIC',
        eventType: 'EXHIBITION',
        currentParticipants: 6,
        maxParticipants: 30,
        entranceFee: 15,
        location: {
            x: 70,
            y: 80,
        }
    },
    {
        id: '161718',
        title: 'Cybersport Tournament',
        description: 'Annual cybersports tournament',
        locationName: 'Gaming Complex',
        availability: 'PUBLIC',
        eventType: 'GAMING',
        currentParticipants: 20,
        maxParticipants: 50,
        entranceFee: 10,
        location: {
            x: 90,
            y: 100,
        }
    },
    {
        id: '192021',
        title: 'Movie Night',
        description: 'Outdoor movie screening festival',
        locationName: 'Park',
        availability: 'PUBLIC',
        eventType: 'FESTIVAL',
        currentParticipants: 15,
        maxParticipants: 25,
        entranceFee: 8,
        location: {
            x: 110,
            y: 120,
        }
    },
    {
        id: '222324',
        title: 'Food Festival',
        description: 'International food festival',
        locationName: 'City Square',
        availability: 'PUBLIC',
        eventType: 'FESTIVAL',
        currentParticipants: 10,
        maxParticipants: 40,
        entranceFee: 12,
        location: {
            x: 130,
            y: 140,
        }
    },
    {
        id: '252627',
        title: 'Hackathon',
        description: '24-hour coding competition',
        locationName: 'Tech Hub',
        availability: 'PUBLIC',
        eventType: 'HACKATHON',
        currentParticipants: 25,
        maxParticipants: 50,
        entranceFee: 0,
        location: {
            x: 150,
            y: 160,
        }
    },
    {
        id: '282930',
        title: 'Networking Event',
        description: 'Business networking event',
        locationName: 'Conference Hall',
        availability: 'PUBLIC',
        eventType: 'NETWORKING',
        currentParticipants: 18,
        maxParticipants: 30,
        entranceFee: 5,
        location: {
            x: 170,
            y: 180,
        }
    },
] as Event[];

function UserEvents() {
    const scrollRef = useHorizontalScroll();

    return (
        <>
            <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-900">
                    Volodymyr Booblick Events
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    Evplore amazing events by Volodymyr
                </div>
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex justify-center">
                    <div ref={scrollRef as any} className="flex overflow-x-auto gap-x-6 custom-scrollbar py-3 w-full lg:w-11/12 px-4 shadow-inner">
                        {events.map((event, index) => (
                            <div key={index} className="min-w-[40%] shrink-0 text-left">
                                <EventCard {...event} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserEvents