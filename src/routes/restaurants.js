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
const restaurantRoutes = require('./routes/restaurants');

// ==========================================
// 🌐 ROUTES ROUTING
// ==========================================
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/restaurants', restaurantRoutes);



module.exports = app;
