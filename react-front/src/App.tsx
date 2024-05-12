import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { action as authAction } from './pages/AuthenticationPage'
import { action as profileAction } from './pages/ProfilePage'
import AuthenticationPage from './pages/AuthenticationPage';
import RootLayout from './pages/RootLayout';
import ErrorPage from './pages/ErrorPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';

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
        },
        {
          path: 'profile/edit',
          element: <ProfilePage />,
          action: profileAction,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App
