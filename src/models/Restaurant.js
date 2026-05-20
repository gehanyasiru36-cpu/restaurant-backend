const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: String,
  rating: Number,
  reviews: Number,
  discount: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', restaurantSchema);