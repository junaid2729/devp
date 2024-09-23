import React, { useState } from 'react';
import UserList from '../pages/UserList'; // Adjust the import path as needed
import BookingList from '../pages/BookingList'; // Adjust the import path as needed
import AdminRegister from '../Admin/AdminRegister'; // Import AdminRegister component
import './adminDashboard.css'; // Create a CSS file for styling

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('users');

  const renderContent = () => {
    switch (activePage) {
      case 'users':
        return <UserList />;
      case 'bookings':
        return <BookingList />;
      case 'register':
        return <AdminRegister />;
      default:
        return <UserList />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li
            className={activePage === 'users' ? 'active' : ''}
            onClick={() => setActivePage('users')}
          >
            Users
          </li>
          <li
            className={activePage === 'bookings' ? 'active' : ''}
            onClick={() => setActivePage('bookings')}
          >
            Bookings
          </li>
          <li
            className={activePage === 'register' ? 'active' : ''}
            onClick={() => setActivePage('register')}
          >
            Register Admin
          </li>
        </ul>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
