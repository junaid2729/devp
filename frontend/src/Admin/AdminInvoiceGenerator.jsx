import React, { useState } from 'react';
import axios from 'axios';
import Invoice from '../pages/Invoice';

const AdminInvoiceGenerator = () => {
  const [username, setUsername] = useState('');
  const [bookings, setBookings] = useState([]);
  const [selectedBookingId, setSelectedBookingId] = useState('');
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null);
  const [error, setError] = useState('');

  // Handle username input change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Handle booking ID selection
  const handleBookingSelect = (e) => {
    setSelectedBookingId(e.target.value);
  };

  // Fetch bookings for the entered username
  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend endpoint to fetch bookings by username
      const response = await axios.get(`/api/bookings/user/${username}`);
      setBookings(response.data);
      setError('');
      setSelectedBookingId(''); // Clear previously selected booking ID
      setSelectedBookingDetails(null); // Clear previously selected booking details
    } catch (err) {
      setError('No bookings found for this user or an error occurred.');
      setBookings([]);
    }
  };

  // Fetch details for the selected booking ID
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend endpoint to fetch booking details by ID
      const response = await axios.get(`/api/bookings/${selectedBookingId}`);
      setSelectedBookingDetails(response.data);
      setError('');
    } catch (err) {
      setError('Booking not found or an error occurred.');
      setSelectedBookingDetails(null);
    }
  };

  return (
    <div>
      <h1>Invoice Generator</h1>

      {/* Form to fetch bookings by username */}
      <form onSubmit={handleUsernameSubmit}>
        <label>
          Username:
          <input 
            type="text" 
            value={username} 
            onChange={handleUsernameChange} 
            required 
          />
        </label>
        <button type="submit">Fetch Bookings</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display list of bookings for the entered username */}
      {bookings.length > 0 && (
        <div>
          <h2>Bookings for {username}:</h2>
          <ul>
            {bookings.map((booking) => (
              <li key={booking._id}>
                Booking ID: {booking._id}, Service: {booking.service}, Date: {booking.date}
              </li>
            ))}
          </ul>

          {/* Form to select a booking ID to generate the invoice */}
          <form onSubmit={handleBookingSubmit}>
            <label>
              Select Booking ID:
              <select value={selectedBookingId} onChange={handleBookingSelect} required>
                <option value="">Select a booking</option>
                {bookings.map((booking) => (
                  <option key={booking._id} value={booking._id}>
                    {booking._id}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Generate Invoice</button>
          </form>
        </div>
      )}

      {/* Render the Invoice component if booking details are available */}
      {selectedBookingDetails && <Invoice booking={selectedBookingDetails} />}
    </div>
  );
};

export default AdminInvoiceGenerator;
