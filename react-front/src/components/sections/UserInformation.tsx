import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouteLoaderData } from "react-router-dom";
import User from "../../interfaces/UserInterface";

//UserInformation component, displays the user's general information in the user profile page
function UserInformation() {
    const { profile } = useRouteLoaderData('profile-layout') as { profile: User, isOwner: boolean };

    return (
        <>
            <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-1 text-gray-900">
                    {profile.firstName} {profile.lastName}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-4 text-blueGray-400 font-semibold">
                    {profile.email}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="w-4 h-4 mr-2" />
                    {profile.location ?? 'No location provided'}
                </div>
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                        <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                            {profile.description}
                        </p>
                        <a href="#" className="text-gray-900 font-semibold">Show more</a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserInformation