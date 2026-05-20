const express = require('express');
const router = express.Router();

// 🔐 Admin Login API Route (POST /api/admin/login)
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin123') {
    res.json({ 
      success: true, 
      message: "Login Successful!", 
      token: "fake-jwt-token-hansom-admin" 
    });
  } else {
    res.status(401).json({ success: false, message: "Username හෝ Password වැරදියි මචන්!" });
  }
});

module.exports = router;