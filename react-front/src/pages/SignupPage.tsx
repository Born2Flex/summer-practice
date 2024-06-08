import { useState } from "react";

import { Typography, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import InputWithLabel from "../components/inputs/InputWithLabel";
import { Form, NavLink, json, redirect, useActionData } from "react-router-dom";
import { setToken, setUserId } from "../auth";

function SignupPage() {
    const data: { error: string } = useActionData() as { error: string };
    const [passwordShown, setPasswordShown] = useState(false);
    const [secondaryPasswordShown, setSecondaryPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
    const toggleSecondaryPasswordVisiblity = () => setSecondaryPasswordShown((cur) => !cur);

    return (
        <div className="z-10 py-2 flex flex-1 justify-center overflow-auto custom-scrollbar bg-radial-blur-lg">

            <section className="grid text-center h-full items-center p-8">
                <div>
                    <Typography variant="h3" color="blue-gray" className="mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Sign Up
                    </Typography>
                    <Typography className="mb-12 text-gray-600 font-normal text-[18px]" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Create your Eventify account
                    </Typography>
                    <Form method="post" className="grid columns-2 gap-x-4 mx-auto max-w-[44rem] text-left">
                        <InputWithLabel
                            label="First Name"
                            id="first-name"
                            color="gray"
                            size="lg"
                            type="text"
                            name="first-name"
                            placeholder="First Name"
                            minLength={3}
                            required
                        />
                        <InputWithLabel
                            label="Last Name"
                            id="last-name"
                            color="gray"
                            size="lg"
                            type="text"
                            name="last-name"
                            placeholder="Last Name"
                            required
                            minLength={3}
                        />
                        <div className="col-span-2">

                            <InputWithLabel
                                label="Your Email"
                                id="email"
                                color="gray"
                                size="lg"
                                type="email"
                                name="email"
                                placeholder="name@mail.com"
                                required
                            />
                        </div>
                        <InputWithLabel
                            label="Password"
                            id="password"
                            color="gray"
                            size="lg"
                            type={passwordShown ? "text" : "password"}
                            name="password"
                            placeholder="********"
                            error={data?.error ? true : false}
                            required
                            minLength={8}
                            icon={<i onClick={togglePasswordVisiblity}>
                                {passwordShown ? (
                                    <EyeIcon className="h-5 w-5" />
                                ) : (
                                    <EyeSlashIcon className="h-5 w-5" />
                                )}
                            </i>}
                        />
                        <InputWithLabel
                            label="Repeat Password"
                            id="repeat-password"
                            color="gray"
                            size="lg"
                            type={secondaryPasswordShown ? "text" : "password"}
                            name="repeat-password"
                            placeholder="********"
                            minLength={8}
                            error={data?.error ? true : false}
                            required
                            icon={<i onClick={toggleSecondaryPasswordVisiblity}>
                                {secondaryPasswordShown ? (
                                    <EyeIcon className="h-5 w-5" />
                                ) : (
                                    <EyeSlashIcon className="h-5 w-5" />
                                )}
                            </i>}
                        />
                        <Button type="submit" color="gray" size="lg" className="mt-6 col-span-2" fullWidth placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            Sign up
                        </Button>
                        <Button
                            variant="outlined"
                            size="lg"
                            className="mt-6 col-span-2 flex h-12 items-center justify-center gap-2"
                            fullWidth placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            <img
                                src={`https://www.material-tailwind.com/logos/logo-google.png`}
                                alt="google"
                                className="h-6 w-6"
                            />{" "}
                            Sign up with google
                        </Button>
                        <Typography
                            variant="small"
                            color="gray"
                            className="!mt-4 col-span-2 text-center font-normal" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            Already have an account?{" "}
                            <NavLink to="/login" className="font-medium text-gray-900">
                                Log in
                            </NavLink>
                        </Typography>
                    </Form>
                </div>
            </section>

        </div>
    );
}

export default SignupPage;

export async function action({ request }: { request: Request }) {
    const data = await request.formData();

    const authData = {
        firstName: data.get('first-name'),
        lastName: data.get('last-name'),
        email: data.get('email'),
        password: data.get('password'),
        repeatPassword: data.get('repeat-password')
    };

    console.log(authData)
    if (authData.password !== authData.repeatPassword) {
        return json({ error: 'Passwords do not match.' }, { status: 422 });
    }

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
        setToken(responseData.token);
        setUserId(responseData.userId);

    } catch (error) {
        if (error instanceof Error) {
            console.error('Error sending registration data:', error.message);
        }
        else {
            console.error('Unexpected error:', error);
        }
    }

    return redirect('/events');

}