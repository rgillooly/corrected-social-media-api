// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');

// Create Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/social_media', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// // Define Mongoose schemas
// const UserSchema = new mongoose.Schema({
//     username: String,
//     email: String,
//     password: String,
// });

// const ThoughtSchema = new mongoose.Schema({
//     text: String,
//     author: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     },
//     reactions: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Reaction'
//     }]
// });

// const ReactionSchema = new mongoose.Schema({
//     emoji: String,
//     thought: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Thought'
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }
// });

// Define models
const User = mongoose.model('User', UserSchema);
const Thought = mongoose.model('Thought', ThoughtSchema);
const Reaction = mongoose.model('Reaction', ReactionSchema);

// Express middleware to parse JSON
app.use(express.json());

// Routes

// Register a new user
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a user
app.delete('/users/:userId', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
});

// Register a new thought
app.post('/thoughts', async (req, res) => {
    try {
        const thought = new Thought(req.body);
        await thought.save();
        res.status(201).send(thought);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a thought
app.delete('/thoughts/:thoughtId', async (req, res) => {
    try {
        await Thought.findByIdAndDelete(req.params.thoughtId);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
});

// Register a new reaction to a thought
app.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
        const { emoji, userId } = req.body;
        const reaction = new Reaction({
            emoji,
            thought: req.params.thoughtId,
            user: userId
        });
        await reaction.save();
        res.status(201).send(reaction);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Delete a reaction to a thought
app.delete('/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        await Reaction.findByIdAndDelete(req.params.reactionId);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
