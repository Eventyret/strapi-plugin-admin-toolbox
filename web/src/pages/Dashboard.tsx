import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = sessionStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
      }
      setLoading(false);
    };

    fetchToken();
  }, []);

  const clearSessionStorage = () => {
    sessionStorage.removeItem('token');
    console.log("Session storage cleared.");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This plugin is a multi-purpose tool to manage your Strapi database records through JSON files. Mostly used to version control config data for automated deployment, automated tests, and data sharing for collaboration purposes.</p>
            <ul className="list-disc list-inside">
              <li>Features</li>
              <li>Installation</li>
              <li>Requirements</li>
              <li>Motivation</li>
              <li>CLI</li>
              <li>Admin panel</li>
              <li>Usage / Workflow</li>
              <li>Config types</li>
              <li>Naming convention</li>
              <li>Settings</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Authentication Token</CardTitle>
          </CardHeader>
          <CardContent>
            <p>JWT Token:</p>
            <pre className="whitespace-pre-wrap break-all bg-gray-100 p-2 rounded-md">{ token || 'No token available' }</pre>
            <button onClick={ clearSessionStorage } className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md">Clear Session Storage</button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
