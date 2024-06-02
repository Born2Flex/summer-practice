import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { action as profileAction } from './pages/ProfilePage'
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import EventsMapPage from './pages/EventsMapPage';
// import { action as searchEventsAction } from './components/sections/EventsSidebar';
import NewEventPage, { action as CreateEventAction } from './pages/NewEventPage';
import LoginPage, { action as loginAction } from './pages/LoginPage';
import SignupPage, { action as signupAction } from './pages/SignupPage';
import EventPage from './pages/EventPage';
import MapWithSidebarLayout, { loader as eventsLoader } from './pages/MapWithSidebarLayout';
import { requireAuth } from './loaders/authLoader.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import { EventsProvider } from './context/EventsProvider.tsx';
import Profile from './pages/Profile.tsx';



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
          element: <Profile />,
          loader: requireAuth,
          children: [
            {
              path: 'edit',
              element: <Profile />,
              action: profileAction,
              loader: requireAuth,
            },
          ]
        },
        {
          path: 'events',
          element: <EventsProvider><MapWithSidebarLayout /></EventsProvider>,
          id: 'map-layout',
          loader: eventsLoader,
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
