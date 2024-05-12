import EditableField from "./EditableField";

interface UserInfoProps {
    name: string;
    description: string;
    avatarUrl: string;
}

const UserInfo = ({ name, description, avatarUrl }: UserInfoProps) => {
    return (
        <div className="flex flex-row items-center">
            <div className="sm:w-[30%] md:w-[25%] lg:w-[18%] xl:w-[12%] sm:w-min-[20%] md:w-min-[20%] lg:w-min-[20%] xl:w-min-[16%] aspect-square rounded-full overflow-hidden mr-8">
                <img src={avatarUrl} alt="User Avatar" className="w-full h-full rounded-full aspect-square object-cover"/>
            </div>

            <div className="flex flex-col flex-1">
                <h1 className="text-5xl font-bold mb-5">{name}</h1>
                <h2 className="text-2xl font-semibold">About me:</h2>
                <p className="text-b">{description}</p>
            </div>
        </div>
    );
}

export default UserInfo;
