import { Form, useNavigate, useRouteLoaderData, Await } from "react-router-dom"
import EventCard from "../cards/EventCard"
import Background from "../elements/Background"
import SearchDetailsForm from "../forms/SearchDetailsForm"
import SearchInput from "../inputs/SearchInput"
import ShortEvent from "../../interfaces/ShortEventInterface"
import { Suspense } from "react"
import EventCardSkeleton from "../cards/EventCardSkeleton"
import { useEventTypes } from "../../hooks/useEvents"

function EventsContent({ initialEvents }: { initialEvents: ShortEvent[] }) {
    const navigate = useNavigate();
    const { data: eventTypes = [], error: typesError } = useEventTypes();
    
    // Use initialEvents directly since loader handles fetching
    const eventsToShow = initialEvents;
    const eventsLoading = false; // Loader handles loading state before render
    const eventsError = null; // Loader handles errors or returns empty/default

    //Function to handle the search form submit event
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const hashtagRegex = /#\w+/g;

        const searchValue = formData.get('search-value') as string;
        const hashtags = searchValue.match(hashtagRegex) || [];
        const cleanSearchValue = searchValue.replace(hashtagRegex, '').trim();

        const queryParams = new URLSearchParams({
            'search-value': cleanSearchValue,
        });

        hashtags.map(tag => tag.slice(1)).forEach(tag => {
            queryParams.append('tag', tag);
        });

        formData.forEach((value, key) => {
            if (key !== 'search-value' && value.toString().trim() !== '') {
                if (key === 'from' || key === 'to') {
                    const date = new Date(value.toString());
                    if (key === 'from') {
                        date.setHours(0, 0, 0, 0);
                    } else if (key === 'to') {
                        date.setHours(23, 59, 59, 999);
                    }
                    const isoDateString = date.toISOString().replace('Z', '');
                    queryParams.append(key, isoDateString);
                    console.log(isoDateString);
                } else {
                    queryParams.append(key, value.toString().toUpperCase());
                }
                console.log(key, value)
            }
        });

        const queryString = queryParams.toString();
        navigate(`/events?${queryString}`);
    };

    return (
        <>
            <Form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
                <SearchInput />
                <SearchDetailsForm eventTypes={eventTypes} />
            </Form>

            <div className="h-full overflow-y-scroll custom-scrollbar z-10 pr-2">
                <div className="flex flex-col gap-y-3">
                    {(eventsError || typesError) && (
                        <div className="text-center text-red-500 p-4">
                            <p>Error loading data. Please try again.</p>
                        </div>
                    )}
                    
                    {!eventsLoading && !eventsError && Array.isArray(eventsToShow) && eventsToShow.length > 0 && (
                        eventsToShow.map((event: ShortEvent, index: number) => (
                            <EventCard key={event.id || index} event={event} />
                        ))
                    )}
                    
                    {!eventsLoading && !eventsError && (!eventsToShow || eventsToShow.length === 0) && (
                        <div className="text-center text-gray-500 p-4">
                            <p>No events found</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

function EventsSidebar() {
    const data = useRouteLoaderData('map-layout') as { events: Promise<ShortEvent[]> };
    
    return (
        <section className='w-fit min-w-[384px] flex flex-col bg-white gap-y-4 z-10 relative shadow-left p-4 pb-0 bg-white/70 overflow-hidden'>
            <Background />
            <div className="absolute z-0 pointer-events-none top-0 left-0 w-full h-full bg-white/65" />
            
            <Suspense fallback={
                <div className="flex flex-col gap-y-3">
                    <div className="flex flex-col gap-y-3">
                        <SearchInput />
                        <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
                    </div>
                    <div className="h-full overflow-y-scroll custom-scrollbar z-10 pr-2">
                        <div className="flex flex-col gap-y-3">
                            {[...Array(5)].map((_, index) => (
                                <EventCardSkeleton key={index} />
                            ))}
                        </div>
                    </div>
                </div>
            }>
                <Await resolve={data.events}>
                    {(initialEvents: ShortEvent[]) => (
                        <EventsContent initialEvents={initialEvents} />
                    )}
                </Await>
            </Suspense>
        </section>
    )
}

export default EventsSidebar