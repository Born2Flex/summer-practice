import Header from './Header.tsx';
import RoundButton from './RoundButton.tsx';
import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom';
import { faArrowRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/TextDataInput.tsx';

interface AuthFormProps {
    id: number;
    onFlip: () => void;
}

function AuthForm({id, onFlip}: AuthFormProps) {
    const data = useActionData() as { errors?: string; message?: string};
    const navigation = useNavigation();

    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    const isSubmitting = navigation.state === 'submitting';

    return (
        <div className="my-3 flex justify-center items-center relative !aspect-[0.61] min-w-[466px]">
        {/*<div className="p-1.5 my-3 flex justify-center items-center relative !aspect-[0.61]">*/}

            {isLogin && (
                <div className="blur rounded-2xl absolute w-full h-full inset-0 bg-gradient-to-br from-yellow-500 via-cyan-700 from-20% via-30%"></div>
            )}
            {!isLogin && (
                <div className="blur rounded-2xl absolute w-full h-full inset-0 bg-gradient-to-b from-yellow-500 via-cyan-700 to-yellow-500 from-10% via-20%" />
            )}
            <Form
                method='post'
                className={`flex flex-col px-5 py-3 z-10 w-full h-full rounded-2xl bg-cover bg-center ${isLogin ? 'bg-login' : 'bg-register'}`}
            >
                <div>
                    <RoundButton
                        icon={faChevronLeft}
                        className='flex items-center justify-center rounded-full p-2 w-fit h-fit bg-transparent'
                    />
                </div>
                <div className='flex-none mt-10 mb-14'>
                    <Header
                        title={isLogin ? "Welcome back!" : "Create Account"}
                        subtitle={isLogin ? 'Discover new events around you!' : "Join sharing and creating events"}
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


                <div className={`flex-1 flex flex-col ${isLogin ? 'justify-end' : 'justify-between'}`}>
                    <Input
                        label="Name"
                        name={isLogin ? 'nameLogin' : 'nameRegister'}
                        type="text"
                        color={isLogin ? 'black' : 'white'}
                    />
                    {!isLogin && (
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                        />
                    )}

                    <Input
                        label="Password"
                        name={isLogin ? 'passwordLogin' : 'passwordRegister'}
                        type="password"
                        color={isLogin ? 'black' : 'white'}
                    />
                    {!isLogin && (
                        <Input
                            label="Repeat Password"
                            name="repeatPassword"
                            type="password"
                        />
                    )}
                </div>

                <div className="flex-none flex items-center justify-between mt-2">
                    <div className={`text-4xl m-0 p-0 ${isLogin ? 'text-black' : 'text-white'}`}>
                        {isLogin ? 'Sign In' : 'Sign Up'}
                    </div>
                    <RoundButton
                        icon={faArrowRight}
                        disabled={isSubmitting}
                        className='flex p-4 items-center justify-center rounded-full w-fit h-fit bg-[#1BB8DA]'
                    />
                </div>
                <div className="flex-none mt-6">
                    <Link
                        to={`?mode=${isLogin ? 'signup' : 'login'}`}
                        className='hover:underline ' onClick={onFlip}
                    >
                        {isLogin ? 'Create Account' : 'Log in'}
                    </Link>
                </div>
            </Form>
        </div>
    );
};


export default AuthForm;