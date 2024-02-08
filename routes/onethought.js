// Import necessary modules
const express = require('express');
const Thought = require('../models/thought');

// Create an Express router
const router = express.Router();

// Route to get a specific thought by ID
router.get('/thoughts/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        if (!thought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(200).json(thought);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export the router
module.exports = router;
