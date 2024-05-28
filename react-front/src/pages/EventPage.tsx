import { Button } from "@material-tailwind/react";
import { NavLink, useParams } from "react-router-dom";
import Sponsors from "../components/cards/Sponsors";
import BrowserMockup from "../components/elements/BrowserMockup";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

function EventPage() {
    const { id } = useParams();

    return (
        <div className='flex flex-col gap-y-8 relative w-full h-full overflow-y-scroll custom-scrollbar backdrop-blur-md bg-gray-200 bg-opacity-20'>

            <div className="relative flex flex-col items-center justify-center">
                <div className="relative w-full h-fit flex flex-col py-10 px-4 bg-green-50/50 justify-center items-center">
                    <div className='flex w-11/12 flex-col md:flex-row justify-center items-center divide-x-2 divide-gray-800/10 gap-x-12'>


                        <div className='flex flex-1 justify-center items-center'>
                            <section className="flex flex-1 max-h-[700px] min-h-[400px]">
                                <MapContainer center={[40.7128, -74.0070]} zoom={13} scrollWheelZoom={true} className="flex-1 rounded-xl border-2 border-gray-900">
                                    <TileLayer
                                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                                    <Marker
                                        position={[40.7128, -74.0070]}
                                    >
                                        <Popup>
                                            A pretty CSS3 popup. <br /> Easily customizable.
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </section>
                        </div>
                        <div className="flex flex-col max-w-2xl items-center">

                            <div className='flex flex-col gap-y-8 w-10/12 items-center md:items-start'>
                                <div>
                                    <h2 className="text-5xl font-bold mb-6">Event ID: {id}</h2>
                                    <p className="text-3xl mb-4">Enjoy creating and sharing events!</p>
                                    <p>Our goal is to provide users with the ability to always have information
                                        about all events near their location, increasing the level of interaction between different social strata and groups.
                                    </p>
                                </div>
                                <NavLink to="/events">
                                    <Button
                                        variant="gradient"
                                        size="lg"
                                        className="hidden lg:inline-block" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                    >
                                        <span>Let's go!</span>
                                    </Button>
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <Sponsors />

                    <div className="absolute bottom-0 w-full h-0.5 bg-gray-800/10 z-10 [mask-image:linear-gradient(to_right,transparent,white_4rem,white_calc(100%-4rem),transparent)]"></div>

                </div>

                <div className="flex -mt-px -mb-px h-[2px] w-4/6 -scale-x-100 z-20">
                    <div className="w-full flex-none blur-sm [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                    <div className="-ml-[100%] w-full flex-none blur-[1px] [background-image:linear-gradient(90deg,rgba(56,189,248,0)_0%,#0EA5E9_32.29%,rgba(236,72,153,0.3)_67.19%,rgba(236,72,153,0)_100%)]"></div>
                </div>

            </div>
        </div>
    );
}

export default EventPage;
