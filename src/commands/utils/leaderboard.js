const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const User = require('../../models/User');

module.exports = {
    category: 'utils',
    permissions: [],
    usage: null,
    aliases: ['scoreboard', 'top'],
    data: new SlashCommandBuilder()
        .setName('leaderboard')
        .setDescription('Displays stats leaderboard')
        .addIntegerOption(option =>
            option
                .setName('size')
                .setDescription('The size of the leaderboard (default: 3)')
                .setRequired(false)
                .setMinValue(1)
        ),
    async run(interaction, client) {
        const size = interaction.options.getInteger('size') || 3;

        const users = await User.find();

        const embed = new EmbedBuilder()
            .setTitle('Leaderboard')
            .setColor('#a1c6e8')
            .setTimestamp()
            .setThumbnail('https://images.alphacoders.com/695/thumb-1920-69561.jpg')
            .setAuthor({
                name: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
            })
            .setFooter({
                text: client.user.tag,
                iconURL: client.user.displayAvatarURL()
            })

        users.filter((user) => user.stats.text > 0 || user.stats.voice > 0).sort((a, b) => b.stats.text - a.stats.text).sort((a, b) => b.stats.voice - a.stats.voice).slice(0, size).forEach((user, index) => {
            embed.addFields({
                name: `#${index+1} ${interaction.guild.members.cache.get(user.id).user.username}`,
                value: `\`${user.stats.text} messages\`\n\`${Math.round(user.stats.voice / 60)} hours and ${user.stats.voice % 60} minutes\``
            })
        });

        interaction.reply({ embeds: [embed] });
    }
}