import UserPic from '../assets/empty-user.webp'
import { Button, Textarea, Typography } from "@material-tailwind/react";
import { Link, useRouteLoaderData, useNavigate } from 'react-router-dom';
import ImageInput from '../components/inputs/ImageInput';
import InputWithLabel from '../components/inputs/InputWithLabel';
import { getUserId } from '../auth';
import { useUser, useUpdateProfile } from '../hooks/useApiQueries';

//EditProfile component, displays the same profile page for the user, but with the ability to edit properties
function EditProfile() {
    const loaderData = useRouteLoaderData('profile-layout') as { userId: string, isOwner: boolean };
    const { data: profile, isLoading, error } = useUser(loaderData.userId);
    const updateProfileMutation = useUpdateProfile();
    const navigate = useNavigate();
    const userId = getUserId();
    console.log('profile data inside edit-profile:', profile);

    if (!loaderData.isOwner) return <div>you can't edit other people profiles</div>;

    if (isLoading) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <p>Loading profile...</p>
            </div>
        );
    }

    if (error || !profile) {
        return (
            <div className="w-full h-full flex justify-center items-center">
                <p>Error loading profile</p>
            </div>
        );
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        const profileData = {
            email: formData.get('email')?.toString(),
            firstName: formData.get('name')?.toString(),
            lastName: formData.get('surname')?.toString(),
            imgUrl: formData.get('profile-image')?.toString(),
            location: formData.get('location')?.toString(),
            description: formData.get('description')?.toString(),
        };

        try {
            await updateProfileMutation.mutateAsync({ userId: userId!, profileData });
            console.log('Profile updated successfully');
            navigate(`/profile/${userId}`);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (

        <div className="w-full h-full overflow-auto scrollbar-invisible">
            <section className="relative bg-gray-50/60 pt-24 pb-10 min-h-full">
                <div className="container mx-auto px-4">
                    <div className="relative flex flex-col min-w-0 break-words bg-gray-50/80 w-full mb-6 shadow-xl rounded-lg">
                        <form onSubmit={handleSubmit} className="px-6">
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
                        </form>
                    </div>
                </div>
            </section>
        </div>)
}

export default EditProfile
