import UserPic from '../assets/empty-user.webp'
import { Button, Textarea, Typography } from "@material-tailwind/react";
import { Form, Link, redirect, useRouteLoaderData } from 'react-router-dom';
import ImageInput from '../components/inputs/ImageInput';
import InputWithLabel from '../components/inputs/InputWithLabel';
import User from '../interfaces/UserInterface'
import { getUserId } from '../auth';

function EditProfile() {
    const { profile, isOwner } = useRouteLoaderData('profile-layout') as { profile: User, isOwner: boolean };
    const userId = getUserId();
    console.log('profile data inside edit-profile:', profile);

    if (!isOwner) return <div>you can't edit other people profiles</div>;

    return (

        <div className="w-full h-full overflow-auto scrollbar-invisible">
            <section className="relative bg-gray-50/60 pt-24 pb-10">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-gray-50/80 w-full mb-6 shadow-xl rounded-lg">
                        <Form method='PUT' className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                                    <div className="relative">
                                        <div className='shadow-xl h-auto rounded-full align-middle bg-gray-50/90 border-none -m-16 -ml-20 lg:-ml-16 max-w-[150px]'>

                                            <ImageInput id='profile-image' name='profile-image' previewImg={profile.imgUrl || UserPic} round />
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                                    <div className="flex py-6 px-3 mt-32 sm:mt-0 gap-4 justify-center">
                                        <Button
                                            type='submit'
                                            variant='filled'
                                            color='gray'
                                            placeholder={undefined}
                                            onPointerEnterCapture={undefined}
                                            onPointerLeaveCapture={undefined}
                                        >
                                            Save Profile
                                        </Button>
                                    </div>
                                </div>
                                <div className="w-full lg:w-4/12 px-4 lg:order-1 lg:text-right lg:self-center">
                                    <div className="flex py-6 px-3 mt-32 sm:mt-0 gap-4 justify-center">
                                        <Link to={`/profile/${userId}`}>
                                            <Button
                                                variant='outlined'
                                                color='gray'
                                                placeholder={undefined}
                                                onPointerEnterCapture={undefined}
                                                onPointerLeaveCapture={undefined}
                                            >
                                                Cancel Editing
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>


                            <div className="text-center mx-auto mt-12 mb-10 w-2/3">
                                <InputWithLabel
                                    label="Your Name"
                                    color="gray"
                                    size="lg"
                                    placeholder="Your Name"
                                    name="name"
                                    containerProps={{
                                        className: "min-w-full",
                                    }}
                                    defaultValue={profile ? profile.firstName : ''}
                                    required
                                />
                                <InputWithLabel
                                    label="Your Surname"
                                    color="gray"
                                    size="lg"
                                    placeholder="Your Surname"
                                    name="surname"
                                    containerProps={{
                                        className: "min-w-full",
                                    }}
                                    defaultValue={profile ? profile.lastName : ''}
                                    required
                                />
                                <InputWithLabel
                                    label="Your Email"
                                    color="gray"
                                    size="lg"
                                    placeholder="example@gmail.com"
                                    type="email"
                                    name="email"
                                    containerProps={{
                                        className: "min-w-full",
                                    }}
                                    defaultValue={profile ? profile.email : ''}
                                    required
                                />
                                <InputWithLabel
                                    label="Your Location"
                                    color="gray"
                                    size="lg"
                                    placeholder="Your mom's house"
                                    name="location"
                                    containerProps={{
                                        className: "min-w-full",
                                    }}
                                    defaultValue={profile ? profile.location : ''}
                                    required
                                />
                                <div className="mt-6 pt-2 border-t border-blueGray-200 text-center">
                                    <div>
                                        <Typography
                                            variant="small"
                                            className="mb-2 text-left font-medium !text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                            >
                                            Profile Description
                                        </Typography>
                                        <Textarea
                                            color="gray"
                                            placeholder="Description"
                                            name="description"
                                            className="!border focus:!border-gray-900 !border-blue-gray-200 !ring-0"
                                            containerProps={{
                                                className: "!min-w-full",
                                            }}
                                            labelProps={{
                                                className: "hidden",
                                            }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}
                                            defaultValue={profile ? profile.description : ''}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </section>
        </div>)
}

export default EditProfile

export async function action({ request }: { request: Request }) {
    const data = await request.formData();
    const userId = getUserId();

    const token = localStorage.getItem('jwt');
    if (!token) {
        throw new Error('No JWT token found');
    }

    let eventData: any;

    eventData = {
        email: data.get('email')?.toString(),
        firstName: data.get('name')?.toString(),
        lastName: data.get('surname')?.toString(),
        imgUrl: data.get('profile-image')?.toString(),
        location: data.get('location')?.toString(),
        description: data.get('description')?.toString(),
    };

    console.log('Gathered profile data:', eventData);
    const baseurl = import.meta.env.VITE_API_URL as string || 'http://localhost:8080';

    const response = await fetch(`${baseurl}/rest/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(eventData)
    });

    if (!response.ok) {
        console.error(`Error ${response.status} ${response.json()}`);
        throw new Error(`Error ${response.status} ${response.json()}`);
    }

    console.log('Event created successfully:', response);

    return redirect(`/profile/${userId}`);

}