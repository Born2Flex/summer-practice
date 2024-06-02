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

function TabsButtons({ locationData }: { locationData: LatLngExpression }) {
    const { data: fetchedData, isLoading, error, refetch } = useFetch({ latLng: locationData });
    console.log(fetchedData);
    // const isLoading = false;
    // const fetchedData = {
    //     addresses: [
    //         {
    //             formattedAddress: "Ukraine, Kyiv",
    //         },
    //     ],
    // }
    const data = [
        {
            label: "Public",
            value: "PUBLIC",
            icon: EyeIcon,
        },
        {
            label: "Paid",
            value: "PAID",
            icon: BanknotesIcon,
        },
        {
            label: "Private",
            value: "PRIVATE",
            icon: KeyIcon,
        },
    ];
    return (
        <Tabs value="PUBLIC">
            <TabsHeader placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {data.map(({ label, value, icon }) => (
                    <Tab key={value} value={value} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <div className="flex flex-1 items-center gap-2">
                            {React.createElement(icon, { className: "w-5 h-5" })}
                            {label}
                        </div>
                    </Tab>
                ))}
            </TabsHeader>
            <TabsBody placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                {data.map(({ value }) => (
                    <TabPanel key={value} value={value} className="px-0 pb-0">
                        <EventCreationFrom tabName={value} location={isLoading ? 'Loading...' : fetchedData.addresses[0].formattedAddress} locationData={locationData} />
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}

export default TabsButtons;