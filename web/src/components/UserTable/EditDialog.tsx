import React, { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Admin } from './Columns';

interface EditDialogProps {
  admin: Admin;
  onSave: (updatedAdmin: Admin) => void;
}

const EditDialog: React.FC<EditDialogProps> = ({ admin, onSave }) => {
  const [formData, setFormData] = useState(admin);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit Admin</DialogTitle>
        <DialogDescription>Edit the details of the admin.</DialogDescription>
        <form className="space-y-4">
          <div>
            <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">First Name</label>
            <Input id="firstname" name="firstname" value={ formData.firstname } onChange={ handleChange } />
          </div>
          <div>
            <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">Last Name</label>
            <Input id="lastname" name="lastname" value={ formData.lastname } onChange={ handleChange } />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <Input id="email" name="email" type="email" value={ formData.email } onChange={ handleChange } />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={ handleSave }>Save</Button>
            <DialogClose asChild>
              <Button type="button">Cancel</Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
