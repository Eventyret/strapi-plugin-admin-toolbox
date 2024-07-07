import React, { useState } from 'react';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Circle } from 'lucide-react';

interface CreateAdminDialogProps {
  open: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

const CreateAdminDialog: React.FC<CreateAdminDialogProps> = ({ open, onClose, onUserCreated }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    // Validate password
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setError('Password must be at least 8 characters long and include at least one uppercase letter and one number.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch('/sat/strapi/admins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });
      if (response.ok) {
        onUserCreated();
        onClose();
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        console.error('Error creating user:', errorMessage);
      }
    } catch (error) {
      setError('Error creating user');
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={ open } onOpenChange={ onClose }>
      <DialogContent>
        <DialogTitle>Create Admin User</DialogTitle>
        <Input
          placeholder="First Name"
          value={ firstname }
          onChange={ (e) => setFirstname(e.target.value) }
        />
        <Input
          placeholder="Last Name"
          value={ lastname }
          onChange={ (e) => setLastname(e.target.value) }
        />
        <Input
          placeholder="Email"
          type="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <Input
          placeholder="Password"
          type="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        { error && <p style={ { color: 'red' } }>{ error }</p> }
        <DialogFooter>
          <Button onClick={ onClose } variant="secondary">
            Cancel
          </Button>
          <Button onClick={ handleSubmit } variant="default" disabled={ loading }>
            { loading ? <Circle size={ 24 } className="animate-spin" /> : 'Create' }
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAdminDialog;
