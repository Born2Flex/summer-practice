import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { action as profileAction } from './pages/ProfilePage'
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import EventsPage from './pages/EventsPage';
import NewEventPage, { action as CreateEventAction } from './pages/NewEventPage';
import LoginPage, { action as loginAction } from './pages/LoginPage';
import SignupPage, { action as signupAction } from './pages/SignupPage';



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
          action: CreateEventAction,
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
