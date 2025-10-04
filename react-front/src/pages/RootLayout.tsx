import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import NewNavigation from '../components/sections/NavigationBar';
import '../background.scss';
import Background from '../components/elements/Background';
import { clearAllAuth, getAccessToken, getUserId } from '../auth';
import { WebSocketProvider } from '../context/WebSocketContext';
import { AuthProvider } from '../context/AuthContext';
import ErrorBoundary from '../components/ErrorBoundary';

//RootLayout component that defines the layout of the app
function RootLayout() {
    const data = useLoaderData() as { isRegistered: boolean };
    const userId = getUserId();
    const navigate = useNavigate();

    const handleAuthError = () => {
        clearAllAuth();
        navigate('/login');
    };

    return (
        <ErrorBoundary onAuthError={handleAuthError}>
            <AuthProvider>
                <WebSocketProvider userId={userId}>
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
                </WebSocketProvider>
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default RootLayout;

//Action to logout
export async function action() {
    clearAllAuth();
    return redirect('/');
}

//Loader to check if user is registered
export async function loader() {
    console.log('GENERAL LOADER');
    const token = getAccessToken();
    if (!token) {
        return {
            isRegistered: false,
        }
    }

    return {
        isRegistered: true,
    }

}
