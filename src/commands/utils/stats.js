const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const User = require("../../models/User");
const { EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    category: 'utils',
    permissions: [],
    usage: '[user]',
    aliases: ['statistics'],
    data: new SlashCommandBuilder()
        .setName("stats")
        .setDescription("Displays a user stats")
        .addUserOption((option) =>
            option
                .setName("user")
                .setDescription("The user you want to display stats")
        ),
    async run(interaction, client) {
        const user = interaction.options.getUser("user") || interaction.user;
        const userData = await User.findOne({ id: user.id });

        if (!userData)
            return interaction.reply({
                content: "No stat found for this user",
                flags: MessageFlags.Ephemeral,
            });


        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`${user.username}'s stats`)
                    .setColor(0x1d3c6d)
                    .setAuthor({
                        name: interaction.user.username,
                        iconURL: interaction.user.displayAvatarURL({
                            dynamic: true,
                        }),
                    })
                    .setThumbnail(user.displayAvatarURL({ dynamic: true }))
                    .addFields(
                        {
                            name: "Messages",
                            value: `\`${userData.stats.text}\``,
                        },
                        {
                            name: "Voice time",
                            value: `\`${Math.round(
                                userData.stats.voice / 60
                            )} hours and ${userData.stats.voice % 60} minutes\``,
                        }
                    )
                    .setFooter({
                        text: client.user.tag,
                        iconURL: client.user.displayAvatarURL(),
                    }),
            ],
        });
    },
};
