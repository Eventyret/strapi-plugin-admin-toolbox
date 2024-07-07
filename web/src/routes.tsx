import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Settings from './pages/Settings';
import Users from './pages/Users';
import AuthWrapper from './components/AuthWrapper';
import About from './pages/About';

export const routes = [
  { path: '/', element: <Dashboard />, label: 'Dashboard', icon: 'HomeIcon' },
  { path: 'users', element: <Users />, label: 'Users', icon: 'UsersIcon' },
  { path: 'settings', element: <Settings />, label: 'Settings', icon: 'SettingsIcon' },
  { path: 'about', element: <About />, label: 'About', icon: 'HomeIcon' },
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
