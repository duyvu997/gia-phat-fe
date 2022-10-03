import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import { routesString } from './constants/index';
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import UserCreate from './pages/UserCreate';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/home',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <Navigate to={routesString.DASHBOARD} /> },
        { path: 'dashboard', element: <DashboardApp /> },
        { path: 'users', element: <User /> },
        { path: 'users/create', element: <UserCreate /> },
        { path: 'users/update/:id', element: <UserCreate /> },
        { path: 'projects', element: <User /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to={routesString.DASHBOARD} /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '404', element: <NotFound /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
