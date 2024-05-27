import EventCard from "../cards/EventCard"
import Background from "../elements/Background"
import SearchDetailsForm from "../forms/SearchDetailsForm"
import SearchInput from "../inputs/SearchInput"

const events = [
    {
        name: 'Sigma Rizz Party',
        location: 'Usa, Ohio, 1234 Street',
        people: 10,
        type: 'party',
        link: '/events/1',
        limit: 20,
    },
    {
        name: 'Event 2',
        location: 'Location 2',
        people: 5,
        type: 'birthday',
        link: '/events/2',
        limit: 10,
        price: 5
    },
    {
        name: 'Event 3',
        location: 'Location 3',
        people: 15,
        type: 'meeting',
        link: '/events/3',
        price: 15
    },
    {
        name: 'Event 4',
        location: 'Location 4',
        people: 20,
        type: 'gaming',
        link: '/events/4',
        limit: 40,
        price: 20
    },
    {
        name: 'Event 5',
        location: 'Location 5',
        people: 25,
        type: 'birthday',
        link: '/events/5',
        limit: 50,
    }
]


function EventsSidebar() {

    return (
        <section
            className={`transition-all duration-500 delay-150 w-1/4 has-[nav]:w-1/2 min-w-[384px] flex flex-col bg-white gap-y-4 z-10 relative shadow-left p-4 bg-white/70 overflow-hidden`}
        >
            <Background />
            <div className="absolute z-0 pointer-events-none top-0 left-0 w-full h-full bg-white/50">

            </div>
            {/* <div className="bg-white"> */}
            <div className="flex flex-col gap-y-3">
                <SearchInput />
                <SearchDetailsForm />
            </div>

            <div className="h-full overflow-y-scroll custom-scrollbar z-10 pr-2">
                <div className="flex flex-col gap-y-3">
                    {events.map((event, index) => (
                        <EventCard key={index} {...event} />
                    ))}
                </div>
            </div>
            {/* </div> */}
        </section>

    )
}

export default EventsSidebar