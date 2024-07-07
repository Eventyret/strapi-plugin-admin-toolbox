import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Header />
        <main className="flex-1 p-4 md:p-6">
          <React.Suspense fallback={ <LoadingSpinner /> }>
            <Outlet />
          </React.Suspense>
        </main>
      </div>
    </div>
  );
};

export default Layout;
