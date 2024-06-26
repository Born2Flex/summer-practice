import UserPic from '../assets/empty-user.webp'
import React from "react";
import {
    Button,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import {
    Square3Stack3DIcon,
    UserCircleIcon,
} from "@heroicons/react/24/solid";
import UserInformation from '../components/sections/UserInformation';
import UserEvents from '../components/sections/UserEvents';
import { Form, Link, defer, redirect, useRouteLoaderData } from 'react-router-dom';
import { getToken, getUserId } from '../auth';
import User from '../interfaces/UserInterface';

//Profile component, displays the user profile page
function Profile() {
    const { profile, isOwner } = useRouteLoaderData('profile-layout') as { profile: User, isOwner: boolean };
    console.log('profile data inside component:', profile);
    console.log('isOwner:', isOwner);

    //Data for the profile tabs
    const data = [
        {
            label: "Profile",
            value: "profile",
            icon: UserCircleIcon,
            desc: <UserInformation />,
        },
        {
            label: "Events",
            value: "events",
            icon: Square3Stack3DIcon,
            desc: <UserEvents isOwner={isOwner} />,
        },
    ];

    return (

        <div className="w-full h-full overflow-auto scrollbar-invisible">
            <section className="relative bg-gray-50/60 pt-24 pb-10 min-h-full">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-gray-50/80 w-full mb-6 shadow-xl rounded-lg">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="relative">
                                        <img alt="..." src={profile.imgUrl || UserPic} className="shadow-xl rounded-full h-auto aspect-square align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div className="flex py-6 px-3 mt-32 sm:mt-0 gap-4 justify-end">
                                        {isOwner && (
                                            <Link to="/profile/edit">
                                                <Button
                                                    variant='filled'
                                                    color='gray'
                                                    placeholder={undefined}
                                                    onPointerEnterCapture={undefined}
                                                    onPointerLeaveCapture={undefined}
                                                >
                                                    Edit Profile
                                                </Button>
                                            </Link>
                                        )}
                                        {!isOwner && (
                                            <>
                                                <Form method='POST'>
                                                    <Button
                                                        type='submit'
                                                        variant='outlined'
                                                        color='gray'
                                                        placeholder={undefined}
                                                        onPointerEnterCapture={undefined}
                                                        onPointerLeaveCapture={undefined}
                                                    >
                                                        Message
                                                    </Button>
                                                </Form>
                                                <Button
                                                    variant='filled'
                                                    color='gray'
                                                    placeholder={undefined}
                                                    onPointerEnterCapture={undefined}
                                                    onPointerLeaveCapture={undefined}
                                                >
                                                    Friend
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{profile.numOfFriends}</span><span className="text-sm text-blueGray-400">Friends</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{profile.numOfEvents}</span><span className="text-sm text-blueGray-400">Events</span>
                                        </div>
                                        <div className="lg:mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{profile.numOfComments}</span><span className="text-sm text-blueGray-400">Comments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Tabs value="profile" id="custom-animation" className='py-8'>
                                <div className='w-2/3 mx-auto'>
                                    <TabsHeader
                                        placeholder={undefined}
                                        className="bg-white"
                                        indicatorProps={{
                                            className: "bg-transparent shadow-none !text-gray-900 border border-gray-800",
                                        }}
                                        onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        {data.map(({ label, value, icon }) => (
                                            <Tab key={value} value={value} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                                <div className="flex items-center gap-2">
                                                    {React.createElement(icon, { className: "w-5 h-5" })}
                                                    {label}
                                                </div>
                                            </Tab>
                                        ))}
                                    </TabsHeader>
                                </div>
                                <TabsBody
                                    animate={{
                                        initial: { y: 250 },
                                        mount: { y: 0 },
                                        unmount: { y: 250 },
                                    }}
                                    placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    {data.map(({ value, desc }) => (
                                        <TabPanel key={value} value={value}>
                                            {desc}
                                        </TabPanel>
                                    ))}
                                </TabsBody>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </section>
        </div>)
}

export default Profile

//Profile action function, handles user profile editing
async function editProfile({ token, userId }: { token: string, userId: string }) {
    const baseurl = import.meta.env.VITE_API_URL as string || 'http://localhost:8080';

    try {
        const response = await fetch(`${baseurl}/rest/chats/new/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to create chat');
        }

        const responseJson = await response.json();
        console.log('response to creating a chat:', responseJson);

        return redirect(`/chat/${responseJson.id}`);
    } catch (error) {
        console.error('Error fetching chats:', error);
    }
}

//Profile action function, handles user's event deletion
async function deleteEvent({ token, eventId, userId }: { token: string, eventId: string, userId: string }) {
    const baseurl = import.meta.env.VITE_API_URL as string || 'http://localhost:8080';

    try {
        const response = await fetch(`${baseurl}/rest/events/${eventId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete chat');
        }

        return redirect(`/profile/${userId}`);
    } catch (error) {
        console.error('Error fetching chats:', error);
    }
}

//Profile action function, handles profile editing and event deletion
export async function action({ request, params }: { request: any, params: any }) {
    const token = getToken();
    if (!token) {
        return redirect('/login');
    }

    const method = request.method;

    if (method === 'POST') {
        return editProfile({ token, userId: params.userId });
    }

    if (method === 'DELETE') {
        const data = await request.formData();
        const eventId = data.get('eventId');
        return deleteEvent({ token, eventId, userId: params.userId });
    }
}

//Profile loader function, fetches user profile data
export async function loader({ params }: { params: any }) {
    const token = getToken();
    if (!token) {
        return redirect('/login');
    }
    const userId = getUserId();
    const baseurl = import.meta.env.VITE_API_URL as string || 'http://localhost:8080';

    try {
        const startTime1 = new Date();
        const response = await fetch(`${baseurl}/rest/users/${params.userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });

        const endTime1 = new Date();
        const timeTaken1 = Number(endTime1) - Number(startTime1);
        console.log(`Time taken for the first request: ${timeTaken1}ms`);

        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }

        return defer({
            profile: await response.json(),
            isOwner: params.userId === userId,
        })

    } catch (error) {
        console.error('Error fetching events:', error);
        return null;
    }

}