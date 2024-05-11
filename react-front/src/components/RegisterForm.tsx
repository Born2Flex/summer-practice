import Header from './Header.tsx';
import RoundButton from './RoundButton.tsx';
import { Form, Link, useActionData, useNavigation } from 'react-router-dom';
import { faArrowRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/TextDataInput.tsx';

interface AuthFormProps {
    onFlip: () => void;
}

function RegisterForm({ onFlip }: AuthFormProps) {
    const data = useActionData() as { errors?: string; message?: string };
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <div className="my-3 p-1 flex justify-center items-center relative !aspect-[0.61]">

            <div className="blur rounded-2xl absolute w-full h-full inset-0 bg-gradient-to-b from-yellow-500 via-cyan-700 to-yellow-500 from-10% via-20%" />
            <Form
                method='post'
                className='flex flex-col px-5 py-3 z-10 w-full h-full rounded-3xl bg-cover bg-center bg-register'
            >
                <div>
                    <RoundButton
                        icon={faChevronLeft}
                        className='flex items-center justify-center rounded-full p-2 w-fit h-fit bg-transparent'
                    />
                </div>
                <div className='flex-none mt-10 mb-14'>
                    <Header
                        title="Create Account"
                        subtitle="Join sharing and creating events"
                    />
                </div>

                {data && data.errors && (
                    <ul>
                        {Object.values(data.errors).map((error: string) => (
                            <li key={error} className="text-red-500">{error}</li>
                        ))}
                    </ul>
                )}
                {data && data.message && <p>{data.message}</p>}


                <div className='flex-1 flex flex-col justify-between'>
                    <Input
                        label="Name"
                        name='nameRegister'
                        type="text"
                        color='white'
                    />

                    <Input
                        label="Email"
                        name="email"
                        type="email"
                    />

                    <Input
                        label="Password"
                        name='passwordRegister'
                        type="password"
                        color='white'
                    />
                    <Input
                        label="Repeat Password"
                        name="repeatPassword"
                        type="password"
                    />
                </div>

                <div className="flex-none flex items-center justify-between mt-2">
                    <div className='text-4xl m-0 p-0 text-white'>
                        Sign Up
                    </div>
                    <RoundButton
                        icon={faArrowRight}
                        disabled={isSubmitting}
                        className='flex p-4 items-center justify-center rounded-full w-fit h-fit bg-[#1BB8DA]'
                    />
                </div>
                <div className="flex-none mt-6">
                    <Link
                        to='?mode=login'
                        className='hover:underline ' onClick={onFlip}
                    >
                        Log in
                    </Link>
                </div>
            </Form>
        </div>
    );
};


export default RegisterForm;