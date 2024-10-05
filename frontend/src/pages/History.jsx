// src/pages/History.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Import the Auth context
import './history.css'; // Import the CSS file

const History = () => {
  const { user } = useAuth(); // Get user from Auth context
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem('token'); // Get the token from local storage

      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3001/api/user/bookings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBookings(response.data); // Set bookings state
      } catch (err) {
        setError('Error fetching bookings: ' + err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) { // Fetch bookings only if user is logged in
      fetchBookings();
    } else {
      setError('Please log in to view your booking history.');
      setLoading(false);
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="history-container">
      <h1>Your Booking History</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul className="history-list">
          {bookings.map((booking) => (
            <li key={booking._id} className="history-item">
              <p><strong>Username:</strong> {booking.username}</p>
              <p><strong>Email:</strong> {booking.email}</p>
              <p><strong>Pickup Location:</strong> {booking.pickupLocation}</p>
              <p><strong>Drop Location:</strong> {booking.dropLocation}</p>
              <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              <p><strong>Price:</strong> ${booking.price}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
