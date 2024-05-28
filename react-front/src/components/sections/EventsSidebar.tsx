import { Form } from "react-router-dom"
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
        <section className='transition-all duration-500 delay-150 w-1/4 has-[nav]:w-1/2 min-w-[384px] flex flex-col bg-white gap-y-4 z-10 relative shadow-left p-4 pb-0 bg-white/70 overflow-hidden'>
            <Background />
            <div className="absolute z-0 pointer-events-none top-0 left-0 w-full h-full bg-white/65" />
            <Form method="GET" className="flex flex-col gap-y-3">
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