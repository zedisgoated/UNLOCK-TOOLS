require('dotenv').config();
const guildId = process.env.GUILD_ID;
const statChannelId = process.env.STAT_CHANNEL_ID;
const { ActivityType } = require('discord.js');
const User = require('../models/User');

module.exports = {
    name: 'ready',
    once: true,
    run(client) {
        console.log(`Successfully logged in as ${client.user.tag}! 🔓\nUnlock your TRUE POTENTIAL RIGHT NOW!!! 🔥`.blue);

        let i = 0;

        const guild = client.guilds.cache.get(guildId);
        const statChannel = client.channels.cache.get(statChannelId);

        setInterval(() => {
            const statuses = [
                'Unlock your true potential',
                '/help',
                `${guild.memberCount} members`,
                'Made by zed'
            ];

            
            client.user.setActivity(statuses[i], { type: ActivityType.Watching });
            statChannel.setName(`Members: ${guild.memberCount}`).catch(() => {});
            guild.members.cache.filter((member) => member.voice.channel).forEach(async (member) => {

                let user = await User.findOne({ id: member.id });

                if (!user) {
                    user = new User({ id: member.id });
                }

                user.stats.voice++; user.save();

            });
            i = ++i % statuses.length;
        }, 60000);
    }
}