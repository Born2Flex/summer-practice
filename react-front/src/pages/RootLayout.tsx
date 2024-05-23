import { Outlet } from 'react-router-dom';
import NewNavigation from '../components/sections/NavigationBar';
import '../background.scss';
import Background from '../components/elements/Background';

function RootLayout() {

    return (
        <>
            <Background />
            <div className='flex flex-col min-h-screen max-h-screen'>
                <div className={`bg-auth absolute w-full h-full -z-50 inset-0 bg-cover bg-bottom`} />
                <NewNavigation />
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
