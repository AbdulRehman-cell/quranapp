const express = require('express');
const Lesson = require('../models/Lesson');

const router = express.Router();

// GET /api/lessons - List all lessons
router.get('/', async (req, res) => {
  try {
    const lessons = await Lesson.find({});
    res.json(lessons);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch lessons.' });
  }
});

// GET /api/lessons/:id - Get a lesson by ID
router.get('/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ error: 'Lesson not found.' });
    }
    res.json(lesson);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Lesson not found.' });
    }
    res.status(500).json({ error: 'Failed to fetch lesson.' });
  }
});

// POST /api/lessons - Create a new lesson
router.post('/', async (req, res) => {
  try {
    const { title, description, content, level } = req.body;
    if (!title || !description || !content || !level) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const newLesson = new Lesson({ title, description, content, level });
    await newLesson.save();
    res.status(201).json(newLesson);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Failed to create lesson.' });
  }
});

// PUT /api/lessons/:id - Update a lesson by ID
router.put('/:id', async (req, res) => {
  try {
    const { title, description, content, level } = req.body;
    if (!title || !description || !content || !level) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const updatedLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      { title, description, content, level },
      { new: true, runValidators: true }
    );
    if (!updatedLesson) {
      return res.status(404).json({ error: 'Lesson not found.' });
    }
    res.json(updatedLesson);
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Lesson not found.' });
    }
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Failed to update lesson.' });
  }
});

// DELETE /api/lessons/:id - Delete a lesson by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedLesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!deletedLesson) {
      return res.status(404).json({ error: 'Lesson not found.' });
    }
    res.json({ message: 'Lesson deleted successfully.' });
  } catch (err) {
    if (err.name === 'CastError') {
      return res.status(404).json({ error: 'Lesson not found.' });
    }
    res.status(500).json({ error: 'Failed to delete lesson.' });
  }
});

module.exports = router;