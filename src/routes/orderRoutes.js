const express = require('express');
const router = express.Router();

// 🛠️ ඉස්සරහට ඩේටාබේස් කනෙක්ට් කරාම ඔයාගේ Order Model එක මෙතනට ඉම්පෝට් කරගන්න:
// const Order = require('../models/Order'); 

// 🚨 මෙන්න දැනට සේව් වෙන ඕඩර්ස් තියාගන්න Array එකක් (DB එකක් නැති නිසා ටෙස්ට් කරන්න)
let ordersDatabase = [];

// ---------------------------------------------------------
// 1. කිචන් එකට අවශ්‍ය Active Orders විතරක් ලබාගැනීම (GET /api/orders)
// ---------------------------------------------------------
router.get('/', async (req, res) => {
  try {
    // කුස්සියට අවශ්‍ය වෙන්නේ දැනට සකස් කරමින් පවතින (Preparing/Pending) ඕඩර්ස් විතරයි
    const activeOrders = ordersDatabase.filter(order => order.status === "Preparing" || order.status === "Pending");
    res.json(activeOrders);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ---------------------------------------------------------
// 2. Admin Panel එකට මුළු ඕඩර් හිස්ට්‍රියම ලබාගැනීම (GET /api/orders/all)
// ---------------------------------------------------------
router.get('/all', async (req, res) => {
  try {
    // ඇඩ්මින්ට Cancel කරපු, Complete කරපු ඔක්කොම ඕඩර්ස් පේන්න ඕනේ
    res.json(ordersDatabase);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ---------------------------------------------------------
// 3. Admin Dashboard එකට අවශ්‍ය Sales Analytics ලබාගැනීම (GET /api/orders/analytics)
// ---------------------------------------------------------
router.get('/analytics', async (req, res) => {
  try {
    // 📊 1. මුළු ඕඩර්ස් ගණන
    const totalOrders = ordersDatabase.length;

    // 💰 2. මුළු ආදායම (Total Revenue) ගණනය කිරීම
    const totalRevenue = ordersDatabase.reduce((sum, order) => sum + (parseFloat(order.total) || 0), 0);

    // 🍳 3. දැනට කුස්සියේ ඇති සක්‍රීය ඕඩර්ස් ගණන
    const activeOrdersCount = ordersDatabase.filter(o => o.status === "Preparing" || o.status === "Pending").length;

    // 👥 4. මුළු කස්ටමර්ස්ලා ගණන (දැනට සැබෑ DB එකක් නැති නිසා ටෙස්ට් කරන්න Fake Count එකක්)
    const totalCustomers = totalOrders > 0 ? Math.ceil(totalOrders * 0.8) : 0;

    res.json({
      totalOrders,
      totalRevenue: totalRevenue.toFixed(2), // දශමස්ථාන දෙකකට හදලා යවන්නේ
      activeOrders: activeOrdersCount,
      totalCustomers
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ---------------------------------------------------------
// 4. අලුත් ඕඩර් එකක් ක්‍රියේට් කරන තැන (POST /api/orders)
// ---------------------------------------------------------
router.post('/', async (req, res) => {
  try {
    const orderData = req.body;
    console.log('New Order Received:', orderData);

    const mockSavedOrder = {
      _id: "order_" + Date.now(), 
      ...orderData,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "Preparing" 
    };

    ordersDatabase.push(mockSavedOrder);

    const io = req.app.get('io');
    if (io) {
      io.emit('newOrder', mockSavedOrder);
      console.log('📢 Live Order Broadcasted via Socket to Kitchen!');
    }

    res.json(mockSavedOrder); 

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ---------------------------------------------------------
// 5. ඕඩර් එකක ස්ටේටස් එක අප්ඩේට් කරන තැන (PUT /api/orders/:id)
// ---------------------------------------------------------
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log(`Order ${id} status updated to: ${status}`);

    ordersDatabase = ordersDatabase.map(order => 
      order._id === id ? { ...order, status: status } : order
    );

    const io = req.app.get('io');
    if (io) {
      io.emit('statusUpdated', { orderId: id, status: status });
    }

    res.json({ success: true, message: 'Status Updated!', orderId: id, status });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;