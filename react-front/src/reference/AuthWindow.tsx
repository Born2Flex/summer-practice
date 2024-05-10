import React from 'react';
import Header from './Header.tsx';
import TextInput from './TextInput.tsx';
import './RegisterWindow.css'
import LinkText from './LinkText.tsx';
import FullScreenBackground from './FullScreenBackround.tsx';
import RoundButton from './RoundButton.tsx';
import LeftArrow from '../assets/arrow-prev-small-svgrepo-com.svg';
import RightArrow from '../assets/arrow-right-svgrepo-com.svg'

const AuthWindow: React.FC = () => {
    return (
        <div className="relative flex justify-center items-center h-full w-fit bg-transparent">
            <FullScreenBackground />
            <div className="flex flex-col px-6 py-7 w-[466px] h-[760px] md:max-w-md lg:max-w-lg absolute registerWindow">
                <div className="flex-none">
                    <RoundButton iconUrl={LeftArrow} backgroundColor='transparent' padding={2}/>
                </div>
                <div className='flex-none mt-10 mb-16'>   
                    <Header title="Create Account" subtitle="Join sharing and creating events" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                    <TextInput placeholder="Name" type="text" color='white' />
                    <TextInput placeholder="E-mail" type="text" color='white' />
                    <TextInput placeholder="Password" type="password" color='white' />
                    <TextInput placeholder="Repeat password" type="password" color='white' />
                </div>

                <div className="flex-none flex items-center justify-between mt-8">
                    <div className="text-4xl text-white m-0 p-0">Sign Up</div>
                    <RoundButton iconUrl={RightArrow} backgroundColor='#1BB8DA' padding={4}/>
                </div>
                <div className="flex-none mt-6">
                    <LinkText text="Sign In" onClick={() => console.log('Go to Sign In')} />
                </div>
            </div>
        </div>
    );
};


export default AuthWindow;