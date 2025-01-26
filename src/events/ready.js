require('dotenv').config();
const guildId = process.env.GUILD_ID;
const statChannelId = process.env.STAT_CHANNEL_ID;
const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    run(client) {
        console.log(`Successfully logged in as ${client.user.tag}! 🔓\nUnlock your TRUE POTENTIAL RIGHT NOW!!! 🔥`.blue);

        const statuses = [
            'Unlock your true potential',
            '/help',
            () => `${guild.memberCount} members`
        ];

        let i = 0;

        const guild = client.guild.cache.get(guildId);
        const statChannel = client.channels.cache.get(statChannelId);

        setInterval(() => {
            client.user.setActivity(statuses[i], { type: ActivityType.Watching });
            statChannel.setName(`Members: ${guild.memberCount}`).catch(() => {});
            i = ++i % statuses.length;
        }, 60000);
    }
}