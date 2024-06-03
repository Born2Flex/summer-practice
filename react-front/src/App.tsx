import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
// import { action as searchEventsAction } from './components/sections/EventsSidebar';
import NewEventPage, { action as createEventAction, loader as createEventLoader } from './pages/NewEventPage';
import LoginPage, { action as loginAction } from './pages/LoginPage';
import SignupPage, { action as signupAction } from './pages/SignupPage';
import EventPage, { loader as eventLoader } from './pages/EventPage';
import MapWithSidebarLayout, { loader as eventsLoader } from './pages/MapWithSidebarLayout';
import { requireAuth } from './loaders/authLoader.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import Profile from './pages/Profile.tsx';
import EventsSidebar from './components/sections/EventsSidebar.tsx';



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
              loader: requireAuth,
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
              element: <EventPage />,
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
