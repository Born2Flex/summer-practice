import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import NewEventPage, { action as createEventAction, loader as createEventLoader } from './pages/NewEventPage';
import LoginPage, { action as loginAction } from './pages/LoginPage';
import SignupPage, { action as signupAction } from './pages/SignupPage';
import MapWithSidebarLayout, { loader as eventsLoader } from './pages/MapWithSidebarLayout';
import EventSidebar, { action as participateInEventAction, loader as eventLoader } from './components/sections/EventSidebar.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import Profile, { loader as profileDataLoader, action as startChatAction } from './pages/Profile.tsx';
import EventsSidebar from './components/sections/EventsSidebar.tsx';
import EditProfile, { action as editProfileAction } from './pages/EditProfile.tsx';
import ChatSection, { loader as chatUserLoader } from './components/sections/ChatSection.tsx';
import ChatLayout, { loader as userChatsLoader } from './pages/ChatLayout.tsx';


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthProvider><RootLayout /></AuthProvider>,
      errorElement: <ErrorPage />,
      id: 'root',
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'login',
          element: <LoginPage />,
          action: loginAction,
        },
        {
          path: 'signup',
          element: <SignupPage />,
          action: signupAction,
        },
        {
          path: 'profile',
          id: 'profile-layout',
          loader: profileDataLoader,
          children: [
            {
              path: ':userId',
              element: <Profile />,
              action: startChatAction,
            },
            {
              path: 'edit',
              element: <EditProfile />,
              action: editProfileAction,
            },
          ]
        },
        {
          path: 'events',
          element: <MapWithSidebarLayout />,
          id: 'map-layout',
          loader: eventsLoader,
          children: [
            {
              index: true,
              element: <EventsSidebar />,
            },
            {
              path: ':id',
              element: <EventSidebar />,
              action: participateInEventAction,
              loader: eventLoader,
            }
          ]
        },
        {
          path: 'new',
          element: <NewEventPage />,
          action: createEventAction,
          loader: createEventLoader,
        },
        {
          path: 'chat',
          element: <ChatLayout />,
          loader: userChatsLoader,
          children: [
            {
              index: true,
              element: <ChatSection />,
              loader: chatUserLoader,
            },
            {
              path: ':chatId',
              element: <ChatSection />,
              loader: chatUserLoader,
            }
          ]
        }
      ],
    },
  ]);

  return <AuthProvider><RouterProvider router={router} /></AuthProvider>;
}

export default App
