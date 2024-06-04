import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
// import { action as searchEventsAction } from './components/sections/EventsSidebar';
import NewEventPage, { action as createEventAction, loader as createEventLoader } from './pages/NewEventPage';
import LoginPage, { action as loginAction } from './pages/LoginPage';
import SignupPage, { action as signupAction } from './pages/SignupPage';
import MapWithSidebarLayout, { loader as eventsLoader } from './pages/MapWithSidebarLayout';
import EventSidebar, { action as participateInEventAction, loader as eventLoader } from './components/sections/EventSidebar.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import Profile, { loader as profileDataLoader } from './pages/Profile.tsx';
import EventsSidebar from './components/sections/EventsSidebar.tsx';
import EditProfile, { action as editProfileAction } from './pages/EditProfile.tsx';



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
        }
      ],
    },
  ]);

  return <AuthProvider><RouterProvider router={router} /></AuthProvider>;
}

export default App
