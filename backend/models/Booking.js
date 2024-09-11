const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  dropLocation: {
    type: String,
    required: true,
  },
  goodsType: {
    type: String,
    required: true,
  },
  weight: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Booking', BookingSchema);
