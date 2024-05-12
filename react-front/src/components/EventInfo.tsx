interface EventInfoProps {
    name: string;
    description: string;
    avatarUrl: string;
}

const EventInfo = ({ name, description, avatarUrl }: EventInfoProps) => {
    return (
        <div className="flex items-center border-b border-black px-4 py-4">
            <div className="sm:w-[20%] md:w-[20%] lg:w-[20%] xl:w-[16%] aspect-square overflow-hidden mr-8">
                <img src={avatarUrl} alt="User Avatar" className="w-full h-full aspect-square object-cover"/>
            </div>
            <div>
                <h1 className="text-3xl font-bold mb-2">{name}</h1>
                <h2 className="text-xl font-semibold">About me:</h2>
                <p className="text-b">{description}</p>
            </div>
        </div>
    );
}

export default EventInfo;
