import React, { useEffect, useState } from 'react';
import DeleteAdminsExceptFirstDialog from '../components/AdminActions/DeleteExceptFirst';

import { Button } from '../components/ui/button';
import { Admin } from '../lib/types';
import { DataTable } from '../components/AdminTable/DataTable';
import { adminColumns } from '../components/AdminTable/Columns';
import CreateAdminDialog from '../components/AdminActions/CreateAdmin';
import DeleteExceptSelected from '../components/AdminActions/DeleteExceptSelected';
import CreateAdminBatch from '../components/AdminActions/CreateAdminBatch';

const Users: React.FC = () => {
  const [data, setData] = useState<Admin[]>([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openCreateBatchDialog, setOpenCreateBatchDialog] = useState(false);
  const [openDeleteFirstDialog, setOpenDeleteFirstDialog] = useState(false);
  const [openDeleteSelectedDialog, setOpenDeleteSelectedDialog] = useState(false);
  // const [openRestoreDialog, setOpenRestoreDialog] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch('/sat/strapi/admins');
      const result = await response.json();
      console.log(result)
      setData(result);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className='flex justify-end space-x-2 my-5'>
        <Button onClick={ () => setOpenCreateDialog(true) }>Create Admin</Button>
        <Button onClick={ () => setOpenCreateBatchDialog(true) }>Fake Admin Creation</Button>
        <Button onClick={ () => setOpenDeleteFirstDialog(true) }>Delete All Except First</Button>
        <Button onClick={ () => setOpenDeleteSelectedDialog(true) }>Delete All Except Selected</Button>

      </div>
      {/* <Button onClick={ () => setOpenRestoreDialog(true) }>Restore Admin</Button> */ }
      <DataTable columns={ adminColumns } data={ data } />
      <CreateAdminDialog
        open={ openCreateDialog }
        onClose={ () => setOpenCreateDialog(false) }
        onUserCreated={ fetchData }
      />
      <CreateAdminBatch
        open={ openCreateBatchDialog }
        onClose={ () => setOpenCreateDialog(false) }
        onUserCreated={ fetchData }
      />
      <DeleteAdminsExceptFirstDialog
        open={ openDeleteFirstDialog }
        onClose={ () => setOpenDeleteFirstDialog(false) }
        onAdminsDeleted={ fetchData }
      />
      <DeleteExceptSelected
        open={ openDeleteSelectedDialog }
        onClose={ () => setOpenDeleteSelectedDialog(false) }
        onAdminsDeleted={ fetchData }
      />
      {/* <RestoreAdminDialog
        open={ openRestoreDialog }
        onClose={ () => setOpenRestoreDialog(false) }
        onAdminRestored={ fetchData }
      /> */}
    </div>
  );
};

export default Users;
