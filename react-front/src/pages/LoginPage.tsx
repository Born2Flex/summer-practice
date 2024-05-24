import { useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import InputWithLabel from "../components/inputs/InputWithLabel";

function LoginPage() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

    return (
        <div className="z-10 py-2 flex flex-1 justify-center overflow-auto custom-scrollbar bg-radial-blur">

            <section className="grid text-center h-full items-center p-8">
                <div>
                    <Typography variant="h3" color="blue-gray" className="mb-2" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Log In
                    </Typography>
                    <Typography className="mb-16 text-gray-600 font-normal text-[18px]" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        Enter your email and password to log in
                    </Typography>
                    <form action="#" className="mx-auto max-w-[24rem] text-left">
                        {/* <div className="mb-6">
                            <label htmlFor="email">
                                <Typography
                                    variant="small"
                                    className="mb-2 block font-medium text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    Your Email
                                </Typography>
                            </label>
                            <Input
                                id="email"
                                color="gray"
                                size="lg"
                                type="email"
                                name="email"
                                placeholder="name@mail.com"
                                className="w-full placeholder:opacity-100 focus:!border-gray-800 focus:outline-none focus:ring-0 !border-blue-gray-200"
                                labelProps={{
                                    className: "hidden",
                                }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                        </div> */}
                        <InputWithLabel
                            label="Your Email"
                            id="email"
                            color="gray"
                            size="lg"
                            type="email"
                            name="email"
                            placeholder="name@mail.com"
                        />
                        <div className="mb-6">
                            <label htmlFor="password">
                                <Typography
                                    variant="small"
                                    className="mb-2 block font-medium text-gray-900" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    Password
                                </Typography>
                            </label>
                            <Input
                                size="lg"
                                placeholder="********"
                                labelProps={{
                                    className: "hidden",
                                }}
                                className="w-full placeholder:opacity-100 focus:!border-gray-800 focus:outline-none focus:ring-0 !border-blue-gray-200"
                                type={passwordShown ? "text" : "password"}
                                icon={<i onClick={togglePasswordVisiblity}>
                                    {passwordShown ? (
                                        <EyeIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeSlashIcon className="h-5 w-5" />
                                    )}
                                </i>} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined} />
                        </div>
                        <Button color="gray" size="lg" className="mt-6" fullWidth placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
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
                            <a href="#" className="font-medium text-gray-900">
                                Create account
                            </a>
                        </Typography>
                    </form>
                </div>
            </section>

        </div>
    );
}

export default LoginPage;