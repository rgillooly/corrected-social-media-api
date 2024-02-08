const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
    body: {
        type: String,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Reaction = mongoose.model('Reaction', ReactionSchema);

module.exports = Reaction;
