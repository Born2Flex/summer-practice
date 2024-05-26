import React from "react";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import {
    EyeIcon,
    BanknotesIcon, KeyIcon
} from "@heroicons/react/24/solid";
import EventCreationFrom from "../forms/EventCreationFrom";
import { LatLngExpression } from "leaflet";
import useFetch from "../../hooks/useFetch";
import { NavLink } from "react-router-dom";

function TabsButtons({ locationData }: { locationData: LatLngExpression }) {
    const { data: fetchedData, isLoading, error, refetch } = useFetch({ latLng: locationData });
    // const searchParams = new URL(url).searchParams;
    // const type = searchParams.get('type') || 'public';
    console.log(fetchedData);
    const data = [
        {
            label: "Public",
            value: "public",
            icon: EyeIcon,
        },
        {
            label: "Paid",
            value: "paid",
            icon: BanknotesIcon,
        },
        {
            label: "Private",
            value: "private",
            icon: KeyIcon,
        },
    ];
    return (
        <Tabs value="public">
            <TabsHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {data.map(({ label, value, icon }) => (
                    <NavLink role='tab' to={`?type=${value}`} key={value} className="flex items-center justify-center text-center w-full h-full relative bg-transparent text-blue-gray-900 antialiased font-sans text-base font-normal leading-relaxed select-none cursor-pointer">
                        <Tab key={value} value={value} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <div className="flex flex-1 items-center gap-2">
                                {React.createElement(icon, { className: "w-5 h-5" })}
                                {label}
                            </div>
                        </Tab>
                    </NavLink>
                ))}
            </TabsHeader>
            <TabsBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {data.map(({ value }) => (
                    <TabPanel key={value} value={value} className="px-0 pb-0">
                        <EventCreationFrom tabName={value} location={isLoading ? 'Loading...' : fetchedData.addresses[0].formattedAddress + ' ' + locationData} />
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}

export default TabsButtons;