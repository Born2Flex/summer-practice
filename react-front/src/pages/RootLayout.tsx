import { Outlet, redirect, useLoaderData } from 'react-router-dom';
import NewNavigation from '../components/sections/NavigationBar';
import '../background.scss';
import Background from '../components/elements/Background';
import { clearToken, clearUserId, getToken, getUserId } from '../auth';
import { WebSocketProvider } from '../context/WebSocketContext';

function RootLayout() {
    const data = useLoaderData() as { isRegistered: boolean };
    const userId = getUserId();

    return (
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
    );
}

export default RootLayout;

export async function action() {
    clearToken();
    clearUserId();
    return redirect('/');
}

export async function loader() {
    console.log('GENERAL LOADER');
    const token = getToken();
    if (!token) {
        return {
            isRegistered: false,
        }
    }

    // const socket = new SockJS('http://localhost:8080/socket');
    // const stompClient = over(socket);
    // const userId = getUserId();

    // stompClient.connect({}, () => {
    //     console.log('connected');
    //     stompClient?.subscribe(`/chat/${userId}/notifications`, (message: any) => {
    //         console.log(message);
    //     });
    // }, (error: any) => {
    //     console.error(error);
    // });

    return {
        isRegistered: true,
        // stompClient: stompClient,
    }

}
