import React from 'react';
import { Button } from '../ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

interface DeleteDialogProps {
  adminId: string;
  onDelete: (id: string) => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ adminId, onDelete }) => {
  const handleDelete = () => {
    onDelete(adminId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Delete Admin</AlertDialogTitle>
        <AlertDialogDescription>Are you sure you want to delete this admin? This action cannot be undone.</AlertDialogDescription>
        <div className="flex justify-end space-x-2">
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant="destructive" onClick={ handleDelete }>Delete</Button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
