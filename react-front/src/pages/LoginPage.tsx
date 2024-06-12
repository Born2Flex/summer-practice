import { useState } from "react";

import { Typography, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import InputWithLabel from "../components/inputs/InputWithLabel";
import { Form, NavLink, redirect, useActionData } from "react-router-dom";
import { setToken, setUserId } from "../auth";

//LoginPage component, displays the login page
function LoginPage() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
    const data = useActionData() as { error: boolean, message: string } | undefined;

    return (
        <div className="z-10 py-2 flex flex-1 justify-center overflow-auto custom-scrollbar bg-radial-blur">

            <section className="grid text-center h-full items-center p-8">
                <div>
                    <Typography variant="h3" color="blue-gray" className="mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Log In
                    </Typography>
                    <Typography className="mb-14 text-gray-600 font-normal text-[18px]" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Enter your email and password to log in
                    </Typography>
                    <Form method="post" className="mx-auto max-w-[24rem] text-left">

                        <InputWithLabel
                            label="Your Email"
                            id="email"
                            color="gray"
                            size="lg"
                            type="email"
                            name="email"
                            placeholder="name@mail.com"
                            required
                            error={data && data.error}
                        />
                        <InputWithLabel
                            label="Password"
                            id="password"
                            color="gray"
                            size="lg"
                            type={passwordShown ? "text" : "password"}
                            name="password"
                            placeholder="********"
                            required
                            error={data && data.error}
                            icon={<i onClick={togglePasswordVisiblity}>
                                {passwordShown ? (
                                    <EyeIcon className="h-5 w-5" />
                                ) : (
                                    <EyeSlashIcon className="h-5 w-5" />
                                )}
                            </i>}
                        />
                        <Button type="submit" color="gray" size="lg" className="mt-6" fullWidth placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            log in
                        </Button>
                        <div className="!mt-4 flex justify-end">
                            <Typography
                                as="a"
                                href="#"
                                color="blue-gray"
                                variant="small"
                                className="font-medium" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                Forgot password
                            </Typography>
                        </div>
                        <Button
                            variant="outlined"
                            size="lg"
                            className="mt-6 flex h-12 items-center justify-center gap-2"
                            fullWidth placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <img
                                src={`https://www.material-tailwind.com/logos/logo-google.png`}
                                alt="google"
                                className="h-6 w-6"
                            />{" "}
                            log in with google
                        </Button>
                        <Typography
                            variant="small"
                            color="gray"
                            className="!mt-4 text-center font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            Not registered?{" "}
                            <NavLink to="/signup" className="font-medium text-gray-900">
                                Create account
                            </NavLink>
                        </Typography>
                    </Form>
                </div>
            </section>
        </div>
    );
}

export default LoginPage;

//Action to log into the account if there is such. 
//If not, or the data is incorrect return an error message
export async function action({ request }: { request: Request }) {
    const data = await request.formData();
    const authData = {
        email: data.get('email'),
        password: data.get('password'),
    };

    console.log(authData)
    const baseurl = import.meta.env.VITE_API_URL as string || 'http://localhost:8080';

    try {
        const response = await fetch(`${baseurl}/rest/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authData)
        });

        const responseData = await response.json();
        if (response.status === 401) {
            return { error: true, message: responseData.message };
        }
        if (!response.ok) {
            console.error(`Error ${response.status}: ${responseData}`);
            throw new Error(`Error ${response.status}: ${responseData}`);
        }

        const token = responseData.token;
        const userId = responseData.userId;

        console.log('Logged in successfully:', responseData);

        setToken(token);
        setUserId(userId);
    } catch (error) {
        console.error('Error logging in:', error);
    }

    return redirect('/events');
}