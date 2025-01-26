const { Schema, model } = require('mongoose');

const ticketSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    channel: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: false,
        default: 'No reason specified'
    }
});

const Ticket = model('Ticket', ticketSchema);

module.exports = Ticket;