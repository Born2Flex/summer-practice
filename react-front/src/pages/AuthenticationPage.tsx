import { json, redirect, useSearchParams } from "react-router-dom";
import LoginForm from "../components/AuthForm";
import ReactCardFlip from "react-card-flip";
import { useState } from "react";
import RegisterForm from "../components/RegisterForm";

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
                containerStyle={{ display: 'flex' }}
                cardStyles={{
                    front: { display: 'flex' },
                    back: { display: 'flex' }
                }}
            >
                <LoginForm onFlip={handleFlip} />
                <RegisterForm onFlip={handleFlip} />
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
            name: data.get('nameLogin'),
            password: data.get('passwordLogin'),
        };
    } else {
        authData = {
            name: data.get('nameRegister'),
            email: data.get('email'),
            password: data.get('passwordRegister'),
            repeatPassword: data.get('repeatPassword'),
        };
    }

    console.log(authData);

    // const response = await fetch('http://localhost:8080/' + mode, {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(authData),
    // });

    // if (response.status === 422 || response.status === 401) {
    //     return response;
    // }

    // if (!response.ok) {
    //     throw json({ message: 'Could not authenticate user.' }, { status: 500 });
    // }

    // const resData = await response.json();
    // const token = resData.token;

    // localStorage.setItem('token', token);
    // const expiration = new Date();
    // expiration.setHours(expiration.getHours() + 1);
    // localStorage.setItem('expiration', expiration.toISOString());

    return redirect('/');
}
