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

function TabsButtons() {

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
                    <TabPanel key={value} value={value} className="px-0">
                        <EventCreationFrom tabName={value} />
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
}

export default TabsButtons;