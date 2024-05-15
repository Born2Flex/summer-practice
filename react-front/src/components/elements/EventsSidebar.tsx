import EventCard from "../cards/EventCard"
import SearchDetailsForm from "../forms/SearchDetailsForm"
import SearchInput from "../inputs/SearchInput"

function EventsSidebar() {
    return (
        <section className='w-1/4 min-w-[384px] flex flex-col gap-y-4 z-10 relative shadow-left p-4 bg-[#ced2c3] overflow-hidden'>
            <div className="flex flex-col gap-y-3">
                <SearchInput />
                <SearchDetailsForm />
            </div>

            <div className="h-full overflow-y-scroll custom-scrollbar pr-2">
                <div className="flex flex-col gap-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <EventCard key={i} />
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