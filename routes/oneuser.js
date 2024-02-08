// Import necessary modules
const express = require('express');
const User = require('../models/user');

// Create an Express router
const router = express.Router();

// Route to get a specific user by ID
router.get('/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export the router
module.exports = router;
