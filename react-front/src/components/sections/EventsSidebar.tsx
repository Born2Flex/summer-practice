import { Form, useNavigate } from "react-router-dom"
import EventCard from "../cards/EventCard"
import Background from "../elements/Background"
import SearchDetailsForm from "../forms/SearchDetailsForm"
import SearchInput from "../inputs/SearchInput"
import { Event } from "../../pages/EventsMapPage"
import { useEventsContext } from "../../context/EventsProvider"

const getCurrentPosition = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
};

function EventsSidebar({ events }: { events: Event[] }) {
    const navigate = useNavigate();
    const { setEvents } = useEventsContext();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const hashtagRegex = /#\w+/g;

        const searchValue = formData.get('search-value') as string;
        const hashtags = searchValue.match(hashtagRegex) || [];
        let cleanSearchValue = searchValue.replace(hashtagRegex, '').trim();

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
            queryParams.append('longitude', position.coords.longitude.toString());
            queryParams.append('latitude', position.coords.latitude.toString());

            /*let longitude = 13;
            let latitude = 37;

            queryParams.append('longitude', longitude.toString());
            queryParams.append('latitude', latitude.toString());*/
        } catch (error) {
            console.error('Error getting current position:', error);
            // Handle error (e.g., fallback to default location)
        }
    
        const queryString = queryParams.toString();

        const token = localStorage.getItem('jwt');
        if (!token) {
            throw new Error('No JWT token found');
        }

        try {
            const response = await fetch(`http://localhost:8080/rest/events/search?${queryString}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
    
            //const eventData = await response.json();
            const eventData = await response.json();
            setEvents(eventData.map((event: any) => ({
                id: event.id,
                title: event.title,
                description: event.description,
                locationName: event.locationName,
                availability: event.availability,
                eventType: event.eventType,
                currentParticipants: event.currentParticipants,
                maxParticipants: event.maxParticipants,
                entranceFee: event.entranceFee,
                location: {
                    x: event.location.x,
                    y: event.location.y,
                    //x: 40.7178,
                    //y: -74.0090,
                },
            })));

            console.log(eventData);
            // Handle the event data here (e.g., update state with the new events)
        } catch (error) {
            console.error('Error fetching events:', error);
        }

        navigate(`/events?${queryString}`);
    };

    return (
        <section className='transition-all duration-500 delay-150 w-1/4 has-[nav]:w-1/2 min-w-[384px] flex flex-col bg-white gap-y-4 z-10 relative shadow-left p-4 pb-0 bg-white/70 overflow-hidden'>
            <Background />
            <div className="absolute z-0 pointer-events-none top-0 left-0 w-full h-full bg-white/65" />
            <Form onSubmit={handleSubmit} className="flex flex-col gap-y-3">
                <SearchInput />
                <SearchDetailsForm />
            </Form>

            <div className="h-full overflow-y-scroll custom-scrollbar z-10 pr-2">
                <div className="flex flex-col gap-y-3">
                    {events.map((event, index) => (
                        <EventCard key={index} {...event} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default EventsSidebar

// export async function action({ request }: { request: Request }) {
//     const data = await request.formData();

//     let eventData: { [key: string]: string } = {};

//     console.log('Creating event with data:', data);
//     for (const [key, value] of data.entries()) {
//         eventData[key] = value.toString();
//     }

//     console.log('Gathered event data:', eventData);

//     // const response = await fetch('http://localhost:8080/rest/auth/authenticate', {
//     //     method: 'POST',
//     //     headers: {
//     //         'Content-Type': 'application/json'
//     //     },
//     //     body: JSON.stringify(eventData)
//     // });

//     // const responseData = await response.text();
//     // if (!response.ok) {
//     //     console.error(`Error ${response.status}: ${responseData}`);
//     //     throw new Error(`Error ${response.status}: ${responseData}`);
//     // }

//     // console.log('Event created successfully:', responseData);

//     return redirect('/events');

// }