const mongoose = require('mongoose');
require('dotenv').config();
const mongoUri = process.env.MONGO_URI;
require('colors');

async function connectDb() {
    await mongoose.connect(mongoUri);
    console.log('Database connected'.green);
}

module.exports = connectDb;