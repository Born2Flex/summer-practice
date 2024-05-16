import Header from '../elements/Header.tsx';
import { Form, Link, NavLink, useActionData, useNavigation } from 'react-router-dom';
import { faArrowRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Input from '../inputs/TextDataInput.tsx';
import { AwesomeButton } from 'react-awesome-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface LogInFormProps {
    onFlip: () => void;
}

function SignUpForm({ onFlip }: LogInFormProps) {
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
                    <NavLink
                        className='flex items-center justify-center rounded-full p-2 w-fit h-fit bg-transparent'
                        to='..'
                        relative='path'
                    >
                        <FontAwesomeIcon icon={faChevronLeft} className='text-white w-6 h-6' />
                    </NavLink>
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


                <div className='flex flex-col'>
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
                    <AwesomeButton disabled={isSubmitting} className='awesome-button round-awesome-button aspect-square w-14 h-14'>
                        <FontAwesomeIcon icon={faArrowRight} className='text-white w-6 h-6' />
                    </AwesomeButton>
                </div>
                <div className="flex-none mt-auto">
                    <Link
                        to='?mode=login'
                    >
                        <AwesomeButton
                            type="secondary"
                            className='awesome-button-secondary'
                            onMouseDown={onFlip}
                        >
                            Log in
                        </AwesomeButton>
                    </Link>
                </div>
            </Form>
        </div>
    );
};


export default SignUpForm;