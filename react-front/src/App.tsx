import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { action as profileAction } from './pages/ProfilePage'
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import EventsMapPage from './pages/EventsMapPage';
// import { action as searchEventsAction } from './components/sections/EventsSidebar';
import NewEventPage, { action as CreateEventAction } from './pages/NewEventPage';
import LoginPage, { action as loginAction } from './pages/LoginPage';
import SignupPage, { action as signupAction } from './pages/SignupPage';
import EventPage from './pages/EventPage';
import MapWithSidebarLayout from './pages/MapWithSidebarLayout';
import { requireAuth } from './loaders/authLoader.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { EventsProvider } from './context/EventsProvider.tsx';



function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      id: 'root',
      // loader: tokenLoader,
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
        // {
        //   path: 'logout',
        //   action: logoutAction,
        // },
        {
          path: 'profile',
          element: <ProfilePage />,
          loader: requireAuth,
          children: [
            {
              path: 'edit',
              element: <ProfilePage />,
              action: profileAction,
              loader: requireAuth,
            },
          ]
        },
        {
          path: 'events',
          element: <EventsProvider><MapWithSidebarLayout /></EventsProvider>,
          action: profileAction,
          loader: requireAuth,
          // action: searchEventsAction,
          children: [
            {
              index: true,
              element: <EventsMapPage />,
            },
            {
              path: ':id',
              element: <EventPage />,
            }
          ]
        },
        {
          path: 'new',
          element: <NewEventPage />,
          action: CreateEventAction,
          loader: requireAuth,
        }
      ],
    },
  ]);

  return <AuthProvider><RouterProvider router={router} /></AuthProvider>;
}

export default App
