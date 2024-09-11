import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './bookinglist.css'; // Create a CSS file for styling

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="booking-list-container">
      <h2>All Bookings</h2>
      <table className="booking-list-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Pickup Location</th>
            <th>Drop Location</th>
            <th>Goods Type</th>
            <th>Weight</th>
            <th>Date</th>
            <th>Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.username}</td>
              <td>{booking.pickupLocation}</td>
              <td>{booking.dropLocation}</td>
              <td>{booking.goodsType}</td>
              <td>{booking.weight}</td>
              <td>{new Date(booking.date).toLocaleDateString()}</td>
              <td>{booking.time}</td>
              <td>₹{booking.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
