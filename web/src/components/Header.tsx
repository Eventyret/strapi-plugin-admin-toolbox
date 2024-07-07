import { LogOut, MenuIcon, SearchIcon } from 'lucide-react';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatRouteName } from '../lib/formatRouteName';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch('/sat/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        sessionStorage.removeItem('token');
        navigate('/login');
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
        <h1 className="text-lg font-semibold">{ formatRouteName(location.pathname) }</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search users..." className="pl-8 pr-4 sm:w-[200px] md:w-[300px]" />
        </div>
        <Button variant="outline" size="icon" onClick={ handleLogout } className="overflow-hidden rounded-full">
          <LogOut />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
