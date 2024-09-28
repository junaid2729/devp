const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/ // Regular expression to validate email format
    },
    pickupLocation: {
      type: String,
      required: true,
    },
    dropLocation: {
      type: String,
      required: true,
      enum: ['Mumbai', 'Delhi', 'Kolkata', 'Surat'], // Restrict drop locations
    },
    goodsType: {
      type: String,
      required: true,
      enum: ['Fragile', 'Solid', 'Liquid'], // Restrict goods types
    },
    weight: {
      type: String,
      required: true,
      enum: ['0-500kg', '500-1000kg', '1000-1500kg', '1500-2000kg', 'Over 2000kg'], // Restrict weight categories
    },
    date: {
      type: Date,
      required: true,
      get: function (date) {
        return date.toISOString().split('T')[0]; // Return only the date part
      },
    },
    time: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt
);

module.exports = mongoose.model('Booking', BookingSchema);
