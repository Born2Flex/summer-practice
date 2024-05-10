import React from 'react';
import Header from './Header.tsx';
import './RegisterWindow.css'
import RoundButton from './RoundButton.tsx';
import LeftArrow from '../assets/arrow-prev-small-svgrepo-com.svg';
import RightArrow from '../assets/arrow-right-svgrepo-com.svg'
import { Form, Link, useActionData, useNavigation, useSearchParams } from 'react-router-dom';
import Input from '../components/TextDataInput.tsx';

const AuthWindow: React.FC = () => {
    const data = useActionData() as { errors?: string; message?: string };
    const navigation = useNavigation();

    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Form
            method='post'
            className={`flex flex-col px-5 py-3 w-1/4 rounded-2xl bg-cover bg-center ${isLogin ? 'bg-login h-[590px]' : 'bg-register'}`}
        >
            <div>
                <RoundButton iconUrl={LeftArrow} backgroundColor='transparent' padding={2} />
            </div>
            <div className='flex-none mt-7 mb-14'>
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
                    name="name"
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
                    name="password"
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

            <div className="flex-none flex items-center justify-between mt-4">
                <div className={`text-4xl m-0 p-0 ${isLogin ? 'text-black' : 'text-white'}`}>
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </div>
                <RoundButton
                    iconUrl={RightArrow}
                    backgroundColor='#1BB8DA'
                    padding={4}
                    disabled={isSubmitting}
                />
            </div>
            <div className="flex-none mt-6">
                <Link
                    to={`?mode=${isLogin ? 'signup' : 'login'}`}
                    className='hover:underline '
                >
                    {isLogin ? 'Create Account' : 'Log in'}
                </Link>
            </div>
        </Form>
    );
};


export default AuthWindow;