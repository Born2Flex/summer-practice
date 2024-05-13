import { faChevronLeft, faPen, faPlus, faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import RoundButton from "../components/RoundButton";
import ButtonWithText from "../components/ButtonWithText";
import UserInfo from "../components/UserInfo";
import UserEvents from "../components/UserEvents";
import { Form, redirect, useLocation, useNavigate } from "react-router-dom";
import { useState } from 'react';
import EditableField from '../components/EditableField';

function ProfilePage() {
        const navigate = useNavigate();
        const navigation = useLocation();
        const isSubmitting = navigation.state === 'submitting';

        const [name, setName] = useState("John Doe");
        const [description, setDescription] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce nec ultrices lectus.");

        /*const [tempName, setTempName] = useState(name);
        const [tempDescription, setTempDescription] = useState(description);*/

        const isEditMode = navigation.pathname === "/profile/edit";

        const handleEditClick = () => {
                const currentPath = window.location.pathname;
                const newPath = `${currentPath}/edit`;
                navigate(newPath);
        };

        const handleCancelClick = () => {
                navigate('/profile');
        };

        /*const handleDoneClick = () => {
                setName(tempName);
                setDescription(tempDescription);
        };*/

        /*const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                setTempName(event.target.value);
        };

        const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
                setTempDescription(event.target.value);
        };*/

        return (
                <div className='flex flex-col mx-auto w-[75%] py-[2%] px-[2%] bg-white justify-between'>
                        {!isEditMode && (
                                <>
                                        <div className="w-full h-fit flex justify-between">

                                                <div>
                                                        <RoundButton
                                                                icon={faChevronLeft}
                                                                className='flex items-center justify-center rounded-full p-4 w-fit h-fit bg-[#1BB8DA]' />
                                                </div>
                                                <div>
                                                        <ButtonWithText
                                                                text="Edit"
                                                                onClick={handleEditClick}
                                                                icon={faPen}
                                                                className='flex items-center justify-center rounded-full p-4 w-fit h-fit bg-[#1BB8DA] text-white text-xl' />
                                                </div>
                                        </div>
                                        <div>
                                                <UserInfo
                                                        name={name}
                                                        description={description}
                                                        avatarUrl="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" />
                                        </div>
                                </>)}

                        {isEditMode && (
                                <Form method='post'>
                                        <div className="w-full h-fit flex justify-between">

                                                <div>
                                                        <RoundButton
                                                                disabled={isSubmitting}
                                                                icon={faChevronLeft}
                                                                className='flex items-center justify-center rounded-full p-4 w-fit h-fit bg-[#1BB8DA]' />
                                                </div>
                                                <div className='flex flex-row gap-3'>
                                                        <ButtonWithText
                                                                text="Cancel"
                                                                onClick={handleCancelClick}
                                                                disabled={isSubmitting}
                                                                icon={faXmark}
                                                                className='flex items-center justify-center rounded-full p-4 w-fit h-fit bg-[#FF4B4B] text-white text-xl' />
                                                        <ButtonWithText
                                                                text="Done"
                                                                type='submit'
                                                                disabled={isSubmitting}
                                                                icon={faCheck}
                                                                className='flex items-center justify-center rounded-full p-4 w-fit h-fit bg-[#7EAB1F] text-white text-xl' />
                                                </div>
                                        </div>

                                        <div className="flex flex-row items-center">
                                                <div className="sm:w-[30%] md:w-[25%] lg:w-[18%] xl:w-[12%] sm:min-w-[30%] md:min-w-[25%] lg:min-w-[18%] xl:min-w-[12%] aspect-square rounded-full overflow-hidden mr-8">
                                                        <img src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="User Avatar" className="w-full h-full rounded-full aspect-square object-cover" />
                                                </div>
                                                <div className='felx flex-grow max-w-[70%]'>
                                                        <EditableField
                                                                name='name'
                                                                type="text"
                                                                color='black'
                                                                initialValue={name}
                                                                //onChange={handleNameChange}
                                                        />
                                                        <EditableField
                                                                name='description'
                                                                type="text"
                                                                color='black'
                                                                initialValue={description}
                                                                //onChange={handleDescriptionChange}
                                                        />
                                                </div>
                                        </div>

                                </Form>)}

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

export async function action({ request }: { request: Request }) {
        console.log('action');
        const data = await request.formData();
        let profileData = {
                name: data.get('name'),
                description: data.get('description'),
        };

        console.log(profileData);

        // const response = await fetch('http://localhost:8080/' + mode, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(authData),
        // });

        // if (response.status === 422 || response.status === 401) {
        //     return response;
        // }

        // if (!response.ok) {
        //     throw json({ message: 'Could not update user profile.' }, { status: 500 });
        // }

        // const resData = await response.json();
        // const token = resData.token;

        // localStorage.setItem('token', token);
        // const expiration = new Date();
        // expiration.setHours(expiration.getHours() + 1);
        // localStorage.setItem('expiration', expiration.toISOString());

        return redirect('/profile');
}