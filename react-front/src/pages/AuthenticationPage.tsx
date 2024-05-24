import { json, redirect, useSearchParams } from "react-router-dom";
import LoginForm from "../components/forms/LogInForm";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import SignUpForm from "../components/forms/SignUpForm";

function AuthenticationPage() {
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    const [isFlipped, setIsFlipped] = useState(!isLogin);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className='flex flex-1 justify-center'>
            <ReactCardFlip
                flipDirection="horizontal"
                isFlipped={isFlipped}
                containerStyle={{ display: 'flex', minWidth: '389px', height: '100%' }}
                cardStyles={{ front: { display: 'flex' }, back: { display: 'flex' } }}
            >
                <LoginForm onFlip={handleFlip} />
                <SignUpForm onFlip={handleFlip} />
            </ReactCardFlip>
        </div>
    )
}

export default AuthenticationPage

export async function action({ request }: { request: Request }) {
    const searchParams = new URL(request.url).searchParams;
    const mode = searchParams.get('mode') || 'login';

    if (mode !== 'login' && mode !== 'signup') {
        throw json({ message: 'Unsupported mode.' }, { status: 422 });
    }

    const data = await request.formData();
    let authData = {};

    if (mode === 'login') {
        authData = {
            email: data.get('emailLogin'),
            password: data.get('passwordLogin'),
        };
    } else {
        const email = data.get('email');
        const firstName = data.get('firstNameRegister');
        const lastName = data.get('lastNameRegister');
        const password = data.get('passwordRegister');
        const repeatPassword = data.get('repeatPassword');

        if (password !== repeatPassword) {
            throw json({ message: 'Passwords do not match.' }, { status: 422 });
        }

        authData = {
            email,
            password,
            firstName,
            lastName
        };
    }

    console.log(authData);

    if (mode === 'signup') {
        try {
            const response = await fetch('http://localhost:8080/rest/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(authData)
            });

            const responseData = await response.json();

            if (!response.ok) {
                console.error(`Error ${response.status}: ${responseData}`);
                throw new Error(`Error ${response.status}: ${responseData}`);    
            }

            console.log('Created successfully:', responseData);

        } catch (error) {
            if (error instanceof Error) {
                console.error('Error sending registration data:', error.message);
            }
            else {
                console.error('Unexpected error:', error);
            }
        }
    }
    else if (mode === 'login') {
        const response = await fetch('http://localhost:8080/rest/auth/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)
        });

        //const responseData = await response.json();
        const responseData = await response.text();
        if (!response.ok) {
            console.error(`Error ${response.status}: ${responseData}`);
            throw new Error(`Error ${response.status}: ${responseData}`);
        }

        console.log('Logged in successfully:', responseData);
    }

    return redirect('/');
} 

