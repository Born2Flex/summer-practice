import { Form, useNavigate, useRouteLoaderData } from "react-router-dom"
import EventCard from "../cards/EventCard"
import Background from "../elements/Background"
import SearchDetailsForm from "../forms/SearchDetailsForm"
import SearchInput from "../inputs/SearchInput"
import ShortEvent from "../../interfaces/ShortEventInterface"
import { useState } from "react"
import EventCardSkeleton from "../cards/EventCardSkeleton"
import { useEvents, useEventTypes } from "../../hooks/useEvents"

//Function to get the current position of the user
const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

//EventsSidebar component, displays the events sidebar with the search form and events list
function EventsSidebar() {
    const data = useRouteLoaderData('map-layout') as { events: ShortEvent[] };
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useState<{
        'event-type'?: string[];
        'event-category'?: string[];
        from?: string;
        to?: string;
        tag?: string[];
        'search-value'?: string;
        'event-distance'?: number;
        longitude: number;
        latitude: number;
    } | null>(null);
    
    const { data: eventTypes = [], error: typesError } = useEventTypes();
    const { data: searchedEvents = [], isLoading: eventsLoading, error: eventsError } = useEvents(searchParams);
    
    const initialEvents = Array.isArray(data?.events) ? data.events : [];
    const eventsToShow = searchParams ? searchedEvents : initialEvents;

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

        try {
            const position = await getCurrentPosition();
            const params = {
                ...Object.fromEntries(queryParams.entries()),
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
            };
            
            setSearchParams(params);
            const queryString = queryParams.toString();
            navigate(`/events?${queryString}`);

        } catch (error) {
            console.error('Error getting current position:', error);
        }
    };

    return (
        <section className='w-fit min-w-[384px] flex flex-col bg-white gap-y-4 z-10 relative shadow-left p-4 pb-0 bg-white/70 overflow-hidden'>
            <Background />
            <div className="absolute z-0 pointer-events-none top-0 left-0 w-full h-full bg-white/65" />
            <Form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
                <SearchInput />
                <SearchDetailsForm eventTypes={eventTypes} />
            </Form>

            <div className="h-full overflow-y-scroll custom-scrollbar z-10 pr-2">
                <div className="flex flex-col gap-y-3">
                    {(eventsLoading || !searchParams) && (
                        <div className="flex flex-col gap-y-3">
                            {[...Array(5)].map((_, index) => (
                                <EventCardSkeleton key={index} />
                            ))}
                        </div>
                    )}
                    
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

        </section>
    )
}

export default EventsSidebar

export async function loader() {
    // We don't need to manually check tokens here anymore
    // Our React Query hooks will handle authentication automatically via the API client
    // If auth fails, the API client will redirect to login
    return {};
}