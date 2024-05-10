import { Outlet } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

function RootLayout() {
    return (
        <div className='flex flex-col min-h-screen'>
            <div className={`bg-auth absolute w-full h-full -z-50 inset-0 bg-cover bg-bottom`} />
            <MainNavigation />
            <main className='flex flex-1'>
                <Outlet />
            </main>
        </div>
    );
}

export default RootLayout