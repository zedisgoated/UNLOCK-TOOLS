const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    category: 'utils',
    permissions: [],
    usage: '[user]',
    aliases: ['avatar', 'pfp'],
    data: new SlashCommandBuilder()
        .setName('pp')
        .setDescription('Displays a user\'s pp')
        .addUserOption(option =>
            option
                .setName('user')
                .setDescription('The user\'s pp you want to display')
        ),
    run(interaction, client) {
        const user = interaction.options.getUser('user') || interaction.user;

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: interaction.user.username,
                        iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                    })
                    .setImage(user.displayAvatarURL({ dynamic: true }))
                    .setColor('#a1c6e8')
                    .setFooter({
                        iconURL: client.user.displayAvatarURL(),
                        text: client.user.tag
                    })
                    .setTimestamp()
            ]
        });
    }
}