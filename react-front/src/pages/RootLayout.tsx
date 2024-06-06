import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import NewNavigation from '../components/sections/NavigationBar';
import '../background.scss';
import Background from '../components/elements/Background';
import { clearToken, clearUserId, getToken } from '../auth';

function RootLayout() {
    const data = useLoaderData() as { isRegistered: boolean };
    console.log('isRegistered:', data.isRegistered);

    return (
        <>
            <Background />
            <div className='flex flex-col min-h-screen max-h-screen'>
                <div className={`bg-auth absolute w-full h-full -z-50 inset-0 bg-cover bg-bottom`} />
                <NewNavigation registered={data.isRegistered} />
                <main className='flex flex-1 overflow-hidden'>
                    <div className='flex flex-1'>
                        <Outlet />
                    </div>
                </main>
            </div>
        </>
    );
}

export default RootLayout;

export async function action() {
    clearToken();
    clearUserId();
    return redirect('/');
}

export async function loader() {
    const token = getToken();
    if (!token) {
        return {
            isRegistered: false,
        }
    }
    console.log('token:', token);

    return {
        isRegistered: true,
    }

}
