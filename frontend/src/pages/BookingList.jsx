import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Invoice from './Invoice'; // Assuming you may want to include invoice generation here too
import './bookinglist.css'; // Ensure this file exists and is properly styled

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Optional loading state

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="booking-list-container">
      <h2>All Bookings</h2>
      {loading ? (
        <p>Loading bookings...</p>
      ) : (
        <table className="booking-list-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Pickup Location</th>
              <th>Pickup Phone</th> {/* New column for Pickup Phone */}
              <th>Drop Location</th>
              <th>Drop Phone</th> {/* New column for Drop Phone */}
              <th>Goods Type</th>
              <th>Weight</th>
              <th>Date</th>
              <th>Time</th>
              <th>Price</th>
              <th>Invoice</th> {/* Invoice generation column */}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.username}</td>
                <td>{booking.email}</td>
                <td>{booking.pickupLocation}</td>
                <td>{booking.pickupPhone}</td> {/* Display Pickup Phone */}
                <td>{booking.dropLocation}</td>
                <td>{booking.dropPhone}</td> {/* Display Drop Phone */}
                <td>{booking.goodsType}</td>
                <td>{booking.weight}</td>
                <td>{new Date(booking.date).toLocaleDateString()}</td>
                <td>{booking.time}</td>
                <td>₹{booking.price}</td>
                <td>
                  <Invoice bookingData={booking} /> {/* Add invoice generation */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BookingList;
