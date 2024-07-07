import { createBrowserRouter } from 'react-router-dom';
import AuthWrapper from './components/AuthWrapper';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Users from './pages/Users';

export const routes = [
  { path: '/', element: <Dashboard />, label: 'Home', icon: 'HomeIcon', title: "Home" },
  { path: 'users', element: <Users />, label: 'Admin Users', icon: 'UsersIcon', title: "Strapi Admin Users" },
];

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthWrapper>
        <Layout />
      </AuthWrapper>
    ),
    children: routes,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
