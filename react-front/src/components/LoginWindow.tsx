import React from 'react';
import Header from './Header.tsx';
import TextInput from './TextInput.tsx';
import './LoginWindow.css'
import Link from './Link.tsx';
import SignUpButton from './SignUpButton.tsx';
import Return from './Return.tsx';
import FullScreenBackground from './FullScreenBackround.tsx';

const LoginWindow: React.FC = () => {
    return (
        <div className="relative flex justify-center items-center h-full w-fit bg-transparent">
            <FullScreenBackground />
            <div className="bg-white rounded-4xl px-6 py-7 max-w-[466px] md:max-w-md lg:max-w-lg absolute aspect-w-466 aspect-h-760 loginWindow">
                <div className="mt-0">
                    <Return />
                </div>
                <div className='mb-40'>
                    <Header title="Welcome" secondLine='Back!' subtitle="Discover new events around you!" />
                </div>
                <div className="flex flex-col h-auto justify-between mb-10">
                    <div className="mt-6">
                        <TextInput placeholder="Name" type="text" color='black' />
                    </div>
                    <div className="mt-6">
                        <TextInput placeholder="Password" type="password" color='black'/>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-4xl text-black m-0 p-0">Sign In</div>
                    <SignUpButton color="#1BB8DA"/>
                </div>
                <div className="flex items-center justify-between mt-6 mb-5">
                    <Link text="Sign Up" onClick={() => console.log('Go to Sign Up!')} />
                    <Link text="Forgot your password?" onClick={() => console.log('Forgot password!')} />
                </div>
            </div>
        </div>
    );
};


export default LoginWindow;