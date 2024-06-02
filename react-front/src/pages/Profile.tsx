import UserPic from '../assets/photo_2024-05-30_16-21-17.jpg'
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
    Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import UserInformation from '../components/sections/UserInformation';
import UserEvents from '../components/sections/UserEvents';

function Profile() {
    const data = [
        {
            label: "Events",
            value: "events",
            icon: Square3Stack3DIcon,
            desc: <UserEvents />,
        },
        {
            label: "Profile",
            value: "profile",
            icon: UserCircleIcon,
            desc: <UserInformation />,
        },
    ];

    return (

        <div className="w-full h-full overflow-auto scrollbar-invisible">
            <section className="relative bg-gray-50/60 pt-24 pb-10">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-gray-50/80 w-full mb-6 shadow-xl rounded-lg">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="relative">
                                        <img alt="..." src={UserPic} className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]" />
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div className="flex py-6 px-3 mt-32 sm:mt-0 gap-4 justify-end">
                                        <Button
                                            variant='outlined'
                                            color='gray'
                                            placeholder={undefined}
                                            onPointerEnterCapture={undefined}
                                            onPointerLeaveCapture={undefined}
                                        >
                                            Message
                                        </Button>
                                        <Button
                                            variant='filled'
                                            color='gray'
                                            placeholder={undefined}
                                            onPointerEnterCapture={undefined}
                                            onPointerLeaveCapture={undefined}
                                        >
                                            Friend
                                        </Button>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">22</span><span className="text-sm text-blueGray-400">Friends</span>
                                        </div>
                                        <div className="mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">10</span><span className="text-sm text-blueGray-400">Events</span>
                                        </div>
                                        <div className="lg:mr-4 p-3 text-center">
                                            <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Tabs value="events" id="custom-animation" className='py-8'>
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