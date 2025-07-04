import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import AuthLayout from 'layout/Auth';
import Loadable from 'components/Loadable';

// jwt auth
const LoginPage = Loadable(lazy(() => import('pages/auth/Login')));
const RegisterPage = Loadable(lazy(() => import('pages/auth/Register')));

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        {
          path: 'login',
          element: <LoginPage />
        },
        {
          path: 'register',
          element: <RegisterPage />
        },
        // Catch-all for unauthenticated users
        {
          path: '*',
          element: <Navigate to="/login" replace />
        }
      ]
    }
  ]
};

export default LoginRoutes;
