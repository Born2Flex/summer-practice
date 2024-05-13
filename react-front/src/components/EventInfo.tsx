import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faLocation, faPerson } from '@fortawesome/free-solid-svg-icons';

interface EventInfoProps {
    name: string;
    host: string;
    date: string;
    place: string
    description: string;
    avatarUrl: string;
}

const EventInfo = ({ name, host, date, place, description, avatarUrl }: EventInfoProps) => {
    return (
        <div className="flex items-center border-b border-black px-4 py-4">
            <div className="sm:w-[20%] md:w-[20%] lg:w-[20%] xl:w-[16%] sm:w-min-[20%] md:w-min-[20%] lg:w-min-[20%] xl:w-min-[16%] aspect-square overflow-hidden mr-8">
                <img src={avatarUrl} alt="User Avatar" className="w-full h-full aspect-square object-cover"/>
            </div>
            <div className="flex flex-col flex-1">
                <h3><Link className="text-3xl font-bold mb-2" to={""}>{name}</Link></h3>
                <div className="flex flex-row items-center">
                    <FontAwesomeIcon icon={faPerson} className='text-black w-5 h-5 mr-1' />
                    <div className="flex flex-row items-end">
                        <h2 className="text-xl font-semibold p-0 mr-1">Host:</h2>
                        <p className="text-b">{host}</p>
                    </div>
                </div>
                <div className="flex flex-row items-center">
                    <FontAwesomeIcon icon={faLocation} className='text-black w-5 h-5 mr-1' />
                    <div className="flex flex-row items-end">
                        <h2 className="text-xl font-semibold mr-1">Takes place:</h2>
                        <p className="text-b">{place}</p>
                    </div>
                </div>
                <div className="flex flex-row items-center">
                    <FontAwesomeIcon icon={faCalendar} className='text-black w-5 h-5 mr-1' />
                    <div className="flex flex-row items-end">
                        <h2 className="text-xl font-semibold mr-1">Date:</h2>
                        <p className="text-b">{date}</p>
                    </div>
                </div>
                <div className="flex flex-row">
                    <p className="text-b">{description}</p>
                </div>
                
            </div>
        </div>
    );
}

export default EventInfo;
