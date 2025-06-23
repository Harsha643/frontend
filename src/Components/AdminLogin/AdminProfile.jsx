import React, { useEffect, useState } from 'react';

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      const res = await fetch('http://localhost:4000/admin/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setAdmin(data.data);
        

      } else {
        setError(data.msg || 'Failed to load admin data');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Admin Profile</h2>
      {admin ? (
        <div>
          <p><strong>Name:</strong> {admin.name}</p>
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Role:</strong> {admin.role}</p>
        </div>
      ) : (
        <p>{error || 'Loading...'}</p>
      )}
    </div>
  );
};

export default AdminProfile;
