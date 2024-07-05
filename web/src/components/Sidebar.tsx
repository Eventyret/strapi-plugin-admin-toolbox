import { MountainIcon, HomeIcon, UsersIcon, PackageIcon, ShoppingCartIcon, SettingsIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden w-64 flex-col border-r bg-background p-4 md:flex">
      <div className="mb-6">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <MountainIcon className="h-6 w-6" />
          <span>SAT Web UI</span>
        </Link>
      </div>
      <nav className="flex flex-col space-y-1">
        <Link to="/" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
          <HomeIcon className="h-5 w-5" />
          Dashboard
        </Link>
        <Link to="/users" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
          <UsersIcon className="h-5 w-5" />
          Users
        </Link>
        <Link to="/products" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
          <PackageIcon className="h-5 w-5" />
          Products
        </Link>
        <Link to="/orders" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
          <ShoppingCartIcon className="h-5 w-5" />
          Orders
        </Link>
        <Link to="/settings" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted">
          <SettingsIcon className="h-5 w-5" />
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
