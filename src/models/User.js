const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    stats: {
        text: {
            type: Number,
            required: false,
            default: 0
        },
        voice: {
            type: Number,
            required: false,
            default: 0
        }
    },
    sanctions: [{
        type: {
            type: String,
            required: true
        },
        mod: {
            type: String,
            required: false,
            default: 'ULC Protection'
        },
        date: {
            type: Date,
            required: true
        },
        reason: {
            type: String,
            required: false,
            default: 'No reason specified'
        }
    }]
});

const User = model('User', userSchema);

module.exports = User;