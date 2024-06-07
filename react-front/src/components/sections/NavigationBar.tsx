import React from "react";
import {
    Navbar,
    Collapse,
    Typography,
    Button,
    IconButton,
} from "@material-tailwind/react";
import { Form, Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faCommentDots, faHouse, faUser, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { getUserId } from "../../auth";
import { useWebSocket } from "../../context/WebSocketContext";

function NewNavigation({ registered }: { registered: boolean }) {

    const { hasMessages } = useWebSocket()
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
    }, []);

    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="h6"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium text-gray-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <FontAwesomeIcon icon={faHouse} className="text-gray-500" />
                <NavLink to="/" className={({ isActive }) => isActive ? "text-gray-700 font-semibold underline underline-offset-2" : undefined}>
                    Home
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="h6"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium text-gray-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <FontAwesomeIcon icon={faCalendarDays} className="text-gray-500" />
                <NavLink to="/events" className={({ isActive }) => isActive ? "text-gray-700 font-semibold underline underline-offset-2" : undefined}>
                    Events
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="h6"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium text-gray-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <FontAwesomeIcon icon={faWandMagicSparkles} />
                <NavLink to="/new" className={({ isActive }) => isActive ? "text-gray-700 font-semibold underline underline-offset-2" : undefined}>
                    Create Event
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="h6"
                color="blue-gray"
                className={`flex items-center gap-x-2 p-1 font-medium ${hasMessages ? 'text-red-500' : 'text-gray-600'}`}
                placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <FontAwesomeIcon icon={faCommentDots} className="text-gray-500" />
                <NavLink
                    to="/chat"
                    className={({ isActive }) => isActive ? "text-gray-700 font-semibold underline underline-offset-2" : undefined}>
                    Chat
                </NavLink>
            </Typography>
            <Typography
                as="li"
                variant="h6"
                color="blue-gray"
                className="flex items-center gap-x-2 p-1 font-medium text-gray-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                <FontAwesomeIcon icon={faUser} className="text-gray-500" />
                <NavLink to={`/profile/${registered ? getUserId() : '12345'}`} className={({ isActive }) => isActive ? "text-gray-700 font-semibold underline underline-offset-2" : undefined}>
                    Account
                </NavLink>
            </Typography>
        </ul>
    );

    return (
        <Navbar className="mx-auto max-w-full rounded-none border border-gray-800/10 hover:shadow-xl transition-shadow px-4 py-2 lg:px-8 lg:py-4" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
                    <span
                        className="self-center text-4xl font-bold whitespace-nowrap bg-clip-text text-transparent
                        bg-[linear-gradient(to_right,theme(colors.gray.800),theme(colors.gray.900),theme(colors.gray.400),theme(colors.gray.900),theme(colors.gray.800))] bg-[length:300%_auto] animate-gradient">
                        Eventify
                    </span>
                </Typography>
                <div className="hidden lg:block">{navList}</div>
                <div className="flex items-center gap-x-1">
                    {/*<NavLink to='/login'>
                        <Button variant="text" size="sm" className="hidden lg:inline-block" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                            Log In
                        </Button>
                    </NavLink>
                    <NavLink to='/signup'>
                        <Button
                            variant="gradient"
                            size="sm"
                            className="hidden lg:inline-block" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
                            Sign Up
                        </Button>
                    </NavLink>*/}

                    {registered ? (
                        <Form method="PUT" action="/">
                            <Button type="submit" fullWidth variant="gradient" size="sm" className="hidden lg:inline-block" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                <span>Log Out</span>
                            </Button>
                        </Form>

                    ) : (
                        <>
                            <NavLink to='/login'>
                                <Button variant="text" size="sm" className="hidden lg:inline-block" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    Log In
                                </Button>
                            </NavLink>
                            <NavLink to='/signup'>
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    className="hidden lg:inline-block" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
                                    Sign Up
                                </Button>
                            </NavLink>
                        </>
                    )}

                </div>
                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}    >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <div className="container mx-auto">
                    {navList}
                    <div className="flex items-center gap-x-1">
                        {registered ? (
                            <Form method="PUT" action="/" className="flex w-full">
                                <Button type="submit" fullWidth variant="gradient" size="sm" className="" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                    <span>Log Out</span>
                                </Button>
                            </Form>
                        ) : (
                            <>
                                <Link to='/login' className="flex w-1/2">
                                    <Button fullWidth variant="text" size="sm" className="" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        <span>Log In</span>
                                    </Button>
                                </Link>
                                <Link to='/signup' className="flex w-1/2">
                                    <Button fullWidth variant="gradient" size="sm" className="" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                                        <span>Sign up</span>
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Collapse>
        </Navbar>
    );
}

export default NewNavigation;