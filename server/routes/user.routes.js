const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users - List all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
});

// GET /api/users/:id - Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(user);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.status(500).json({ error: 'Failed to fetch user.' });
  }
});

// POST /api/users - Create new user
router.post('/', async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required.' });
    }
    if (typeof email !== 'string' || email.trim() === '') {
      return res.status(400).json({ error: 'Email is required.' });
    }
    const user = new User({
      name: name.trim(),
      email: email.trim(),
      bio: (typeof bio === 'string') ? bio.trim() : ''
    });
    await user.save();
    res.status(201).json(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).json({ error: e.message });
    }
    res.status(500).json({ error: 'Failed to create user.' });
  }
});

// PUT /api/users/:id - Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    const updates = {};
    if (typeof name === 'string' && name.trim() !== '') updates.name = name.trim();
    if (typeof email === 'string' && email.trim() !== '') updates.email = email.trim();
    if (typeof bio === 'string') updates.bio = bio.trim();

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update.' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json(user);
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(404).json({ error: 'User not found.' });
    }
    if (e.name === 'ValidationError') {
      return res.status(400).json({ error: e.message });
    }
    res.status(500).json({ error: 'Failed to update user.' });
  }
});

// DELETE /api/users/:id - Delete user by ID
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });
    res.json({ message: 'User deleted.' });
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.status(500).json({ error: 'Failed to delete user.' });
  }
});

module.exports = router;