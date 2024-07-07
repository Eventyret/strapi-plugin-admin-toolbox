import { Circle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Admin } from '../../lib/types';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface DeleteAdminsExceptSelectedDialogProps {
  open: boolean;
  onClose: () => void;
  onAdminsDeleted: () => void;
}

const DeleteExceptSelected: React.FC<DeleteAdminsExceptSelectedDialogProps> = ({ open, onClose, onAdminsDeleted }) => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [selectedAdmin, setSelectedAdmin] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await fetch('/sat/strapi/admins/');
        const result = await response.json();
        setAdmins(result);
      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };

    if (open) {
      fetchAdmins();
    }
  }, [open]);

  const handleDelete = async () => {
    if (!selectedAdmin) {
      setError('Please select an admin to keep.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('/sat/strapi/admins/keep', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: selectedAdmin }),
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
        <DialogTitle>Delete All Admins Except Selected</DialogTitle>
        <Select onValueChange={ setSelectedAdmin }>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select the admin you want to keep" />
          </SelectTrigger>
          <SelectContent>
            { admins.map((admin) => (
              <SelectItem key={ admin.id } value={ admin.email }>
                { admin.firstname } { admin.lastname } ({ admin.email })
              </SelectItem>
            )) }
          </SelectContent>
        </Select>
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

export default DeleteExceptSelected;
