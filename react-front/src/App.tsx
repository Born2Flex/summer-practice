import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { action as authAction } from './pages/AuthenticationPage'
import { action as profileAction } from './pages/ProfilePage'
import AuthenticationPage from './pages/AuthenticationPage';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import EventsPage from './pages/EventsPage';
import NewEventPage from './pages/NewEventPage';



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
          path: 'auth',
          element: <AuthenticationPage />,
          action: authAction,
        },
        // {
        //   path: 'logout',
        //   action: logoutAction,
        // },
        {
          path: 'profile',
          element: <ProfilePage />,
          children: [
            {
              path: 'edit',
              element: <ProfilePage />,
              action: profileAction,
            },
          ]
        },
        {
          path: 'events',
          element: <EventsPage />,
          action: profileAction,
        },
        {
          path: 'new',
          element: <NewEventPage />,
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
