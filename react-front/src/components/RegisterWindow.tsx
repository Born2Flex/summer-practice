import React from 'react';
import Header from './Header.tsx';
import TextInput from './TextInput.tsx';
import './RegisterWindow.css'
import Link from './Link.tsx';
import SignUpButton from './SignUpButton.tsx';
import Return from './Return.tsx';
import FullScreenBackground from './FullScreenBackround.tsx';

const RegisterWindow: React.FC = () => {
    return (
        <div className="relative flex justify-center items-center h-full w-fit bg-transparent">
            <FullScreenBackground />
            <div className="bg-white rounded-4xl px-6 py-7 max-w-[466px] md:max-w-md lg:max-w-lg absolute aspect-w-466 aspect-h-760 registerWindow">
                <div className="mt-0">
                    <Return />
                </div>
                <Header title="Create Account" subtitle="Join sharing and creating events" />
                <div className="flex flex-col h-auto justify-between mb-12">
                    <div className="mt-6">
                        <TextInput placeholder="Name" type="text" color='white' />
                    </div>
                    <div className="mt-6">
                        <TextInput placeholder="E-mail" type="text" color='white' />
                    </div>
                    <div className="mt-6">
                        <TextInput placeholder="Password" type="password" color='white' />
                    </div>
                    <div className="mt-6">
                        <TextInput placeholder="Repeat password" type="password" color='white' />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-4xl text-white m-0 p-0">Sign Up</div>
                    <SignUpButton color="#1BB8DA"/>
                </div>
                <div className="mt-12 mb-5">
                    <Link text="Sign In" onClick={() => console.log('Go to Sign In')} />
                </div>
            </div>
        </div>
    );
};


export default RegisterWindow;