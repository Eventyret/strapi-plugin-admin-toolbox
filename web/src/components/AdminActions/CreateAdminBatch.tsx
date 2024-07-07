import { Dialog, DialogContent, DialogTitle } from '../ui/dialog';
import { Circle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { DialogFooter } from '../ui/dialog';
import { Input } from '../ui/input';


interface CreateAdminDialogProps {
  open: boolean;
  onClose: () => void;
  onUserCreated: () => void;
}

const CreateAdminBatch: React.FC<CreateAdminDialogProps> = ({ open, onClose, onUserCreated }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/sat/strapi/admins/batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
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
        <DialogTitle>Create Fake Admin Users</DialogTitle>
        <Input
          placeholder="How many admins do you want to create?"
          type='number'
          min={ 0 }
          value={ amount }
          onChange={ (e) => setAmount(e.target.value) }
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

export default CreateAdminBatch;
