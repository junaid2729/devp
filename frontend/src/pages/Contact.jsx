import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext
import axios from 'axios'; // Import axios for HTTP requests
import './contact.css';

const Contact = () => {
  const { user } = useAuth(); // Get the user from AuthContext
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [goodsType, setGoodsType] = useState('');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [price, setPrice] = useState(0);

  // Set the username automatically from the context
  const [username, setUsername] = useState(user?.username || '');

  // Update the username whenever the user object changes
  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const calculatePrice = () => {
    if (!weight) {
      setPrice(0); // Show 0 price if no weight is selected
      return;
    }

    const basePrice = 0;
    const distanceFactor = pickupLocation === dropLocation ? 0.8 : 1;
    const typeFactor = goodsType === 'Fragile' ? 1.5 : 1;

    // Calculate weight price increment
    let weightIncrement = 500; // Base increment price per 500kg
    let weightFactor = 0; // Start with no additional cost

    if (weight === '0-500kg') {
      weightFactor = 1; // Start with 500 for 0-500kg
    } else if (weight === '500-1000kg') {
      weightFactor = 2; // Increment to 1000 for 500-1000kg
    } else if (weight === '1000-1500kg') {
      weightFactor = 3; // Increment to 1500 for 1000-1500kg
    } else if (weight === '1500-2000kg') {
      weightFactor = 4; // Increment to 2000 for 1500-2000kg
    } else if (weight === 'Over 2000kg') {
      weightFactor = 5; // Increment to 2500 for over 2000kg
    }

    const calculatedWeightPrice = weightFactor * weightIncrement;
    const calculatedPrice =
      basePrice * distanceFactor * typeFactor + calculatedWeightPrice;
    setPrice(calculatedPrice);
  };

  useEffect(() => {
    calculatePrice();
  }, [pickupLocation, dropLocation, goodsType, weight]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:3001/api/bookings', {
        username,
        pickupLocation,
        dropLocation,
        goodsType,
        weight,
        date,
        time,
        price
      });

      alert(
        `Booking Confirmed! \nUsername: ${username}\nPickup: ${pickupLocation}\nDrop: ${dropLocation}\nGoods Type: ${goodsType}\nWeight: ${weight}\nDate: ${date}\nTime: ${time}\nPrice: ₹${price}`
      );
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Error creating booking. Please try again.');
    }
  };

  return (
    <div className="contact-us-container">
      <h2>Book a Truck</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled // Disable input to prevent manual editing
          />
        </div>
        {/* Other form fields */}
        <div className="form-group">
          <label>Pickup Location:</label>
          <input
            type="text"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Drop Location:</label>
          <input
            type="text"
            value={dropLocation}
            onChange={(e) => setDropLocation(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Type of Goods:</label>
          <select
            value={goodsType}
            onChange={(e) => setGoodsType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="Fragile">Fragile</option>
            <option value="Solid">Solid</option>
            <option value="Liquid">Liquid</option>
          </select>
        </div>
        <div className="form-group">
          <label>Weight:</label>
          <select
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          >
            <option value="">Select Weight</option>
            <option value="0-500kg">0-500kg</option>
            <option value="500-1000kg">500-1000kg</option>
            <option value="1000-1500kg">1000-1500kg</option>
            <option value="1500-2000kg">1500-2000kg</option>
            <option value="Over 2000kg">Over 2000kg</option>
          </select>
        </div>
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Time:</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Estimated Price: ₹{price}</label>
        </div>
        <button type="submit" className="submit-btn">
          Book Now
        </button>
      </form>
    </div>
  );
};

export default Contact;
