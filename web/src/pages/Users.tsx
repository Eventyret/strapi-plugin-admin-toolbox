import React, { useEffect, useState } from 'react';
import { Admin, columns } from '../components/UserTable/Columns';
import { DataTable } from '../components/UserTable/DataTable';

const Users: React.FC = () => {
  const [data, setData] = useState<Admin[]>([]);

  useEffect(() => {
    // Fetch admin data from your API
    const fetchData = async () => {
      try {
        const response = await fetch('/sat/strapi/admins');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <DataTable columns={ columns } data={ data } />
    </div>
  );
};

export default Users;
