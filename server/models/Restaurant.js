const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  address: {
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    line: {
      type: String,
    },
    locality: {
      type: String,
    },
    pinCode: {
      type: String,
    },
  },
  service: {
    daysOff: [
      { type: String, enum: ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] },
    ],
    open_time: { type: String },
    close_time: { type: String },
  },
  cuisines: [{ type: String }],
  rating: { type: Number },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  staff: {
    chefs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Staff" }],
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  tables: [{ type: mongoose.Schema.Types.ObjectId, ref: "Table" }],
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
    },
  ],
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
