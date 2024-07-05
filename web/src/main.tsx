import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: 'users', element: <Users /> },
      { path: 'products', element: <Products /> },
      { path: 'orders', element: <Orders /> },
      { path: 'settings', element: <Settings /> },
      { path: 'login', element: <Login /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={ router } />
  </React.StrictMode>
);
