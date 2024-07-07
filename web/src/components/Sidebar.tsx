import { HomeIcon, MountainIcon, PackageIcon, SettingsIcon, ShoppingCartIcon, UsersIcon, LucideIcon, RssIcon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../routes';

// Define a type for the icons
interface IconMap {
  [key: string]: LucideIcon;
}

const iconMap: IconMap = {
  HomeIcon,
  UsersIcon,
  MountainIcon,
  SettingsIcon,
  ShoppingCartIcon,
  PackageIcon,
  RssIcon
};

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
        { routes.filter(route => route.label).map((route) => {
          const IconComponent = iconMap[route.icon!];
          return (
            <Link
              key={ route.path }
              to={ route.path }
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              { IconComponent && <IconComponent className="h-5 w-5" /> }
              { route.label }
            </Link>
          );
        }) }
      </nav>
    </aside>
  );
};

export default Sidebar;
