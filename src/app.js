const express = require('express');
const cors = require('cors');

const app = express();

// ==========================================
// 🛠️ MIDDLEWARES
// ==========================================
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Base Route
app.get('/', (req, res) => {
  res.send('Restaurant API Running');
});

// ==========================================
// 📂 ROUTES IMPORT
// ==========================================
const foodRoutes = require('./routes/foodRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

// ==========================================
// 🌐 ROUTES ROUTING
// ==========================================
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);

// ==========================================
// 🍽️ RESTAURANTS ROUTE (inline)
// ==========================================
// ✅ අලුත් ෆයිල් එකක් හදන්නේ නෑ - කෙළින්ම මෙතනම් define කළා
const mongoose = require('mongoose');

// Restaurant Schema එක define කරනවා (DB එකේ 'restaurants' collection එකෙන් ගන්නවා)
const restaurantSchema = new mongoose.Schema({}, { strict: false, collection: 'restaurants' });
const Restaurant = mongoose.models.Restaurant || mongoose.model('Restaurant', restaurantSchema);

// GET /api/restaurants - සියලු restaurants ගන්නවා
app.get('/api/restaurants', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    console.error('Restaurants fetch error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = app;require('dotenv').config();
const connectDB = require('./config/db');
connectDB();