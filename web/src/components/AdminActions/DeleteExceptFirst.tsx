import React, { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Circle } from 'lucide-react';

interface DeleteAdminsExceptFirstDialogProps {
  open: boolean;
  onClose: () => void;
  onAdminsDeleted: () => void;
}

const DeleteAdminsExceptFirstDialog: React.FC<DeleteAdminsExceptFirstDialogProps> = ({ open, onClose, onAdminsDeleted }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/sat/strapi/admins/delete-except-selected', {
        method: 'POST',
      });
      if (response.ok) {
        onAdminsDeleted();
        onClose();
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        console.error('Error deleting admins:', errorMessage);
      }
    } catch (error) {
      setError('Error deleting admins');
      console.error('Error deleting admins:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={ open } onOpenChange={ onClose }>
      <DialogContent>
        <DialogTitle>Delete All Admins Except First</DialogTitle>
        <p>Are you sure you want to delete all admin users except the first one?</p>
        { error && <p style={ { color: 'red' } }>{ error }</p> }
        <DialogFooter>
          <Button onClick={ onClose } variant="secondary">
            Cancel
          </Button>
          <Button onClick={ handleDelete } variant="default" disabled={ loading }>
            { loading ? <Circle size={ 24 } className="animate-spin" /> : 'Delete' }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAdminsExceptFirstDialog;
