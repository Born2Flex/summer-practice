import EventCard from "../cards/EventCard"
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
            className={`transition-all duration-500 delay-150 w-1/4 has-[nav]:w-1/2 min-w-[384px] flex flex-col gap-y-4 z-10 relative shadow-left p-4 bg-white/70 overflow-hidden`}>
            <div className="flex flex-col gap-y-3">
                <SearchInput />
                <SearchDetailsForm />
            </div>

            <div className="h-full overflow-y-scroll custom-scrollbar pr-2">
                <div className="flex flex-col gap-y-3">
                    {events.map((event, index) => (
                        <EventCard key={index} {...event} />
                    ))}
                </div>
            </div>

            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-1 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-40rem)]" aria-hidden="true">
                <div className="blob relative aspect-[1155/678] w-[26.125rem] -translate-x-1/2 -rotate-12 bg-[linear-gradient(to_top_right,#256e3d,#b1ce61,theme(colors.green.300),#0e9f6e,#b0cc63,#a4b386,#73e2a7)] opacity-100 sm:w-[72.1875rem] -left-10 bg-[length:300%_auto] animate-blobs" ></div>
            </div>
        </section>

    )
}

export default EventsSidebar