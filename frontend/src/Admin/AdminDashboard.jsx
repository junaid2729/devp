import React, { useState } from 'react';
import UserList from '../pages/UserList';
import BookingList from '../pages/BookingList';
import AdminRegister from '../Admin/AdminRegister';
import TruckManagement from './TruckManagement'; // Import TruckManagement component
import './adminDashboard.css';

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
      case 'truck-management':
        return <TruckManagement />; // Render the TruckManagement component
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
          <li
            className={activePage === 'truck-management' ? 'active' : ''}
            onClick={() => setActivePage('truck-management')}
          >
            Truck Management
          </li>
        </ul>
      </div>
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default AdminDashboard;
