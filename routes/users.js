// Import necessary modules
const express = require('express');
const User = require('../models/user');

// Create an Express router
const router = express.Router();

// Route to get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Export the router
module.exports = router;
