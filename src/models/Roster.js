const { Schema, model } = require('mongoose');

const rosterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    game: {
        type: String,
        required: true
    },
    members: [{
        id: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true
        }
    }]
});

const Roster = model('Roster', rosterSchema);

module.exports = Roster;