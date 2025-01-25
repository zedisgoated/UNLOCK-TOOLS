const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();
const token = process.env.TOKEN;
const { readdirSync } = require('fs');
const { join } = require('path');
const connectDb = require('./services/mongoose');

const client = new Client({
    intents: Object.keys(GatewayIntentBits)
});

const handlersPath = join(__dirname, 'handlers');
const handlerFiles = readdirSync(handlersPath).filter((file) => file.endsWith('.js'));

for (const file of handlerFiles) {
    const handlerPath = join(__dirname, `handlers/${file}`);
    require(handlerPath)(client);
}

connectDb().catch((err) => {
    console.log(`Could NOT connect databse!\n${err}`.red);
});

client.login(token);