const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  type: { type: "String", enum: ["veg", "nonVeg", "veg&NonVeg"] },
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
  rating: { type: Number, default: 0 },
  reviews: [
    { type: mongoose.Schema.Types.ObjectId, default: [], ref: "Review" },
  ],
  staff: {
    chefs: [
      { type: mongoose.Schema.Types.ObjectId, default: [], ref: "Staff" },
    ],
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      ref: "Product",
    },
  ],
  tables: [{ type: mongoose.Schema.Types.ObjectId, default: [], ref: "Table" }],
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      default: [],
      ref: "Booking",
    },
  ],
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
