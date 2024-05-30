import Background from "../elements/Background"
import { Event } from "../../pages/EventsMapPage"
import { Button, IconButton } from "@material-tailwind/react"
import { faCalendarDays, faHeart } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ArrowLeftIcon, ShareIcon } from "@heroicons/react/24/solid"
import { NavLink } from "react-router-dom"
import { EventSidebarAccordion } from "../elements/EventSidebarAccordion"

function EventSidebar({ name, location, category, people, type, link, limit, price }: Event) {

    return (
        <section className='transition-all duration-500 delay-150 has-[nav]:w-1/3 w-1/4 flex flex-col justify-between min-w-[384px] bg-white z-10 relative shadow-left py-4 px-7 bg-white/70 overflow-hidden'>
            <Background />
            <div className="absolute z-0 pointer-events-none top-0 left-0 w-full h-full bg-white/65" />

            <div className="flex flex-1 max-h-full flex-col z-10">

                <div className="flex flex-row justify-between">
                    <NavLink to='..'>
                        <IconButton
                            variant="text"
                            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        >
                            <ArrowLeftIcon className="w-5 h-5" />
                        </IconButton>
                    </NavLink>

                    <p className="flex items-center text-sm font-semibold">{category.toUpperCase()} {type.toUpperCase()}</p>

                    <div className="flex gap-x-4">
                        <IconButton
                            variant="text"
                            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        >
                            <ShareIcon className="w-5 h-5" />
                        </IconButton>
                        <IconButton
                            variant="text"
                            placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                        >
                            <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                        </IconButton>
                    </div>
                </div>

                {/* <div className="w-full mt-4 mx-auto rounded-2xl shadow-rounded">
                    <img src={BirthdayCard} alt="Event" className="w-full h-24 border-2 border-gray-800 object-cover rounded-2xl" />
                </div> */}

                <div className="mt-4">
                    <h1 className="text-2xl font-bold text-center">Dmytro's birthday party!</h1>
                </div>

                <div className="my-5 flex flex-row justify-between">
                    <div className="flex flex-row">
                        <div className="px-6 flex flex-col justify-center text-center">
                            <h3 className="font-semibold">29</h3>
                            <p className="text-sm font-semibold text-gray-500">Mar</p>
                        </div>
                        <div className="flex flex-col">
                            <h3 className="font-semibold">Tuesday</h3>
                            <p className="text-sm font-semibold text-gray-500">10:00 PM - End</p>
                        </div>
                    </div>
                    <IconButton
                        variant="outlined"
                        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                    >
                        <FontAwesomeIcon icon={faCalendarDays} className="w-5 h-5" />
                    </IconButton>
                </div>

                <EventSidebarAccordion />

            </div>
            <div className="flex flex-row justify-between z-10">
                <div>
                    <h3 className="font-semibold">$25.00-$30.00</h3>
                    <p className="text-sm font-semibold text-gray-500">10 Spots left</p>
                </div>

                <div className="w-1/2">
                    <Button
                        variant="filled"
                        fullWidth
                        size="lg"
                        color="green"
                        placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                    >
                        Join
                    </Button>
                </div>
            </div>

        </section>
    )
}

export default EventSidebar
