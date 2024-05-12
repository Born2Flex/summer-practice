import { faChevronLeft, faPen, faPlus } from '@fortawesome/free-solid-svg-icons';
import RoundButton from "../components/RoundButton";
import ButtonWithText from "../components/ButtonWithText";
import UserInfo from "../components/UserInfo";
import UserEvents from "../components/UserEvents";

function ProfilePage() {
        const history = useHistory();
        const location = useLocation();

        const isEditMode = location.pathname === "/profile/edit";

        const handleEditClick = () => {
                history.push("/edit");
        };
        

    return (
        <div className='flex flex-col mx-auto w-[70%] py-[2%] px-[2%] gap-8 bg-white justify-top'>
                <div className="w-full h-fit flex justify-between">
                        <div>
                                <RoundButton
                                        icon={faChevronLeft}
                                        className='flex items-center justify-center rounded-full p-4 w-fit h-fit bg-[#1BB8DA]'
                                />
                        </div>
                        <div>
                                <ButtonWithText
                                        text="Edit"
                                        icon={faPen}
                                        className='flex items-center justify-center rounded-full p-4 w-fit h-fit bg-[#1BB8DA] text-white text-xl'
                                />
                        </div>
                </div>
                <div>
                        <UserInfo 
                                name="John Doe"
                                description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec ultrices lectus."
                                avatarUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                        />
                </div>

                <div className="w-full h-fit flex justify-between items-center">
                        <div className='text-4xl m-0 p-0 text-black font-semibold'>
                                My Events:
                        </div>
                        <div>
                                <ButtonWithText
                                        text="Add new"
                                        icon={faPlus}
                                        className='flex items-center justify-center rounded-full p-4 w-fit h-fit bg-[#1BB8DA] text-white text-xl'
                                />
                        </div>
                </div>

                <UserEvents />

        </div>
    );
}

export default ProfilePage;