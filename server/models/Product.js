const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please enter a product name"] },
  image: { fileName: { type: String }, url: { type: String } },
  categories: [{ type: String }],
  cuisine: {
    type: String,
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  tag: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
