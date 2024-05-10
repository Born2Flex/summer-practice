import { faRainbow } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useRouteLoaderData } from 'react-router-dom';

function MainNavigation() {
    const token = useRouteLoaderData('root');

    return (
        <nav className="bg-white/50 backdrop-blur-sm dark:bg-gray-900 sticky w-full z-20 top-0 start-0 dark:border-gray-600 shadow-lg">
            <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <FontAwesomeIcon icon={faRainbow} className='h-7' />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Eventify</span>
                </a>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {!token && <NavLink
                        to="/auth?mode=login"
                        className="text-white bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-amber-100 
                        font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-amber-300 dark:hover:bg-amber-400
                        ark:focus:ring-amber-800">
                        Get started
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
                                className={({ isActive }) => isActive ? 'text-amber-500' : undefined}
                                end
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/events"
                                className={({ isActive }) => isActive ? 'text-amber-500' : undefined}
                            >
                                Events
                            </NavLink>
                        </li>
                        {!token && (
                            <li>
                                <NavLink
                                    to="/profile"
                                    className={({ isActive }) => isActive ? 'text-amber-500' : undefined}
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
