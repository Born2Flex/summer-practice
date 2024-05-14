import EventCard from "../cards/EventCard"
import SearchInput from "../inputs/SearchInput"

function EventsSidebar() {
    return (
        <section className='w-1/4 min-w-[384px] flex flex-col gap-y-4 z-10 relative shadow-left p-4 bg-white overflow-hidden'>
            <div className="flex flex-col">
                <SearchInput />

            </div>

            <div className="h-full overflow-y-scroll">
                <div className="flex flex-col gap-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <EventCard key={i} />
                    ))}
                </div>
            </div>

            <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-1 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-40rem)]" aria-hidden="true">
                <div className="blob relative aspect-[1155/678] w-[26.125rem] -translate-x-1/2 -rotate-12 bg-gradient-to-tr from-green-500 via-emerald-500 to-lime-600 opacity-100 sm:w-[72.1875rem] -left-10 bg-[length:300%_auto] animate-blobs" ></div>
            </div>
        </section>

    )
}

export default EventsSidebar