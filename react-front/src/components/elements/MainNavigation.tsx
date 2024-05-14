import { NavLink, useRouteLoaderData } from 'react-router-dom';
import { AwesomeButton } from "react-awesome-button";
import { FlameIcon } from "@primer/octicons-react";
import 'react-awesome-button/dist/styles.css';

function MainNavigation() {
    const token = useRouteLoaderData('root');
    const buttonClassName = 'text-xl font-semibold py-6 link link-underline-black link-underline';

    return (
        <nav className="bg-gradient-to-r from-secondary via-neutral to-secondary dark:bg-gray-900 sticky w-full z-20 top-0 start-0 dark:border-gray-600 shadow-2xl">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4 max-w-[90%]">
                <NavLink
                    to="/"
                    className="flex items-center space-x-3 rtl:space-x-reverse"
                    end
                >
                    {/* <FontAwesomeIcon icon={faRainbow} className='h-7 ' /> */}
                    <span
                        className="self-center text-4xl font-bold whitespace-nowrap bg-clip-text text-transparent
                        bg-[linear-gradient(to_right,theme(colors.green.700),theme(colors.green.500),theme(colors.emerald.700),theme(colors.emerald.500),theme(colors.green.600),theme(colors.emerald.500),theme(colors.green.700))] bg-[length:300%_auto] animate-gradient">
                        Eventify ⨠
                    </span>
                </NavLink>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {!token && <NavLink
                        to="/auth?mode=login"
                    >
                        <AwesomeButton type="primary" className='awesome-button' after={<FlameIcon />} >Get started</AwesomeButton>

                    </NavLink>}
                    <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                </div>
                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className='flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                        <li>
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) => {
                                    return (isActive ? buttonClassName + ' text-danger link-underline-active' : buttonClassName + ' hover:text-danger text-white')
                                }}
                            >
                                Home
                            </NavLink>

                        </li>
                        <li>
                            <NavLink
                                to="/events"
                                className={({ isActive }) => {
                                    return (isActive ? buttonClassName + ' text-danger link-underline-active' : buttonClassName + ' hover:text-danger text-white')
                                }}
                            >
                                Events
                            </NavLink>
                        </li>
                        {!token && (
                            <li>
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) => {
                                        return (isActive ? buttonClassName + ' text-danger link-underline-active' : buttonClassName + ' hover:text-danger text-white')
                                    }}
                                >
                                    Profile
                                </NavLink>
                            </li>
                        )}
                        {/* {token && (
                                <li>
                                    <Form action="/logout" method="post">
                                        <button>Logout</button>
                                    </Form>
                                </li>
                            )} */}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default MainNavigation;
