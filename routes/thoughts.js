// Import necessary modules
const express = require('express');
const Thought = require('../models/thought');

// Create an Express router
const router = express.Router();

// Route to get all thoughts
router.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.status(200).json(thoughts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export the router
module.exports = router;
