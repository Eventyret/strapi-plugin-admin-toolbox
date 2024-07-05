import React, { useState } from 'react';
import { Button } from '../components/ui/button';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const response = await fetch('/sat/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setMessage('Login successful');
      window.location.href = '/'; // Redirect to the desired route
    } else {
      setMessage('Unauthorized');
    }
  };

  const generatePassword = async () => {
    const response = await fetch('http://localhost:3456/sat/auth/get-password', {
      method: 'GET',
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data)
      setPassword(data.password);
    } else {
      setMessage('Failed to generate password');
    }
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={ handleSubmit }>
        <input
          type="password"
          placeholder="Enter password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <button type="submit">Login</button>
      </form>
      <Button onClick={ generatePassword }>Generate Password</Button>
      { message && <p>{ message }</p> }
    </div>
  );
};

export default Login;
