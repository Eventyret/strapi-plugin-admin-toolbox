import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import LoadingSpinner from '../components/LoadingSpinner';

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const authenticate = async () => {
    setLoading(true);
    const response = await fetch('/sat/auth/authenticate', {
      method: 'GET',
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      sessionStorage.setItem('token', data.token);
      navigate('/');
    } else {
      console.error('Failed to authenticate');
    }
    setLoading(false);
  };

  return (
    <div className="login-container flex flex-col items-center justify-center min-h-screen">
      { loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <h1>Login</h1>
          <Button onClick={ authenticate }>Authenticate</Button>
        </>
      ) }
    </div>
  );
};

export default Login;
