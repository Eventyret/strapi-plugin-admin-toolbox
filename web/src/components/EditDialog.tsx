import React, { useState } from 'react';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Admin } from '../lib/types';

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

  const handleToggle = () => {
    setFormData({
      ...formData,
      isActive: !formData.isActive,
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
          <div className="flex items-center space-x-2">
            <Switch id="isActive" checked={ formData.isActive } onCheckedChange={ handleToggle } />
            <Label htmlFor="isActive">Active</Label>
          </div>
          <div className="flex justify-end space-x-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={ handleSave }>Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
