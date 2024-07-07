import React, { useEffect, useState } from 'react';
import { Admin, adminColumns } from '../components/AdminTable/Columns';
import { DataTable } from '../components/AdminTable/DataTable';
import { Button } from '../components/ui/button';
import CreateAdminDialog from '../components/CreateAdminDialog';
import DeleteAdminsExceptFirstDialog from '../components/DeleteAdminsExceptFirstDialog';
import DeleteAdminsExceptSelectedDialog from '../components/DeleteAdminsExceptSelectedDialog';

const Users: React.FC = () => {
  const [data, setData] = useState<Admin[]>([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
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
      <DeleteAdminsExceptFirstDialog
        open={ openDeleteFirstDialog }
        onClose={ () => setOpenDeleteFirstDialog(false) }
        onAdminsDeleted={ fetchData }
      />
      <DeleteAdminsExceptSelectedDialog
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
