import useHorizontalScroll from '../../hooks/useHorizontalScroll';
import EventCard from '../cards/EventCard'
import { useRouteLoaderData } from 'react-router-dom';
import { useUser } from '../../hooks/useApiQueries';

//UserEvents component, displays the user's events in a horizontal scrollable list in user profile page
function UserEvents({ isOwner, onDeleteEvent }: { isOwner: boolean, onDeleteEvent?: (eventId: string) => void }) {
    const scrollRef = useHorizontalScroll();
    const loaderData = useRouteLoaderData('profile-layout') as { userId: string, isOwner: boolean };
    const { data: profile, isLoading, error } = useUser(loaderData.userId);

    if (isLoading) {
        return (
            <div className="text-center mt-12">
                <p>Loading events...</p>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="text-center mt-12">
                <p>Error loading user events</p>
            </div>
        );
    }

    return (
        <>
            <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-900">
                    {profile.firstName} {profile.lastName} Events
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                    Explore amazing events by {profile.firstName}
                </div>
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex justify-center">
                    <div ref={scrollRef as any} className="flex overflow-x-auto gap-x-6 custom-scrollbar py-3 w-full lg:w-11/12 px-4 shadow-inner">
                        {profile.events.map((event, index) => (
                            <div key={index} className="min-w-[40%] shrink-0 text-left">
                                <EventCard event={event} deletable={isOwner} onDelete={onDeleteEvent} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserEvents