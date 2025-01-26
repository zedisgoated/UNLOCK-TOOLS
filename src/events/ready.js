const { ActivityType } = require('discord.js');

require('colors');
require('dotenv').config();
const guildId = process.env.GUILD_ID;
const statChannelId = process.env.STAT_CHANNEL_ID;

function ready(client) {
    console.log(`Successfully logged in as ${client.user.tag}! 🔓\nUnlock your TRUE POTENTIAL RIGHT NOW!!! 🔥`.blue);
}

function setPresence(client, guild) {
    const statuses = [
        'Unlock your true potential',
        '/help',
        `${guild.memberCount} members`
    ];

    let i = 0;

    setInterval(() => {
        client.user.setActivity(statuses[i], { type: ActivityType.Watching });
        i = ++i % statuses.length;
    }, 60000);
}

function updateStatChannel(client, guild) {
    setInterval(() => {
        const statChannel = client.channels.cache.get(statChannelId);
        if (!statChannel) return console.error('Please check your STAT_CHANNEL_ID_ID in .env file!'.red);
    
        statChannel.setName(`Members: ${guild.memberCount}`);
    }, 60000);
}

module.exports = {
    name: 'ready',
    once: true,
    run(client) {
        ready(client);

        const guild = client.guilds.cache.get(guildId);
        if (!guildId) return console.error('Please check your GUILD_ID parameter in .env file'.red);

        setPresence(client, guild);
        updateStatChannel(client, guild);
    }
}