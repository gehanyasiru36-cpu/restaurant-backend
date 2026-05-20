const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
}, { timestamps: true });

const Food = mongoose.models.Food || mongoose.model('Food', foodSchema);

// GET - සියලු foods ගන්නවා
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST - නව food එකක් add කරනවා
router.post('/', async (req, res) => {
  try {
    const food = new Food(req.body);
    await food.save();
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE - food එකක් delete කරනවා
router.delete('/:id', async (req, res) => {
  try {
    await Food.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;