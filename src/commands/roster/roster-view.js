const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const Roster = require("../../models/Roster");
const { EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    category: "roster",
    permissions: [],
    usage: "<name>",
    aliases: ['see', 'display'],
    data: new SlashCommandBuilder()
        .setName("roster-view")
        .setDescription("Displays a roster")
        .addStringOption((option) =>
            option
                .setName("name")
                .setDescription("The roster's name you want to view")
                .setRequired(true)
        ),
    async run(interaction, client) {
        const rosterName = interaction.options.getString("name");
        const roster = await Roster.findOne({ name: rosterName });

        if (!roster)
            return interaction.reply({
                content: `Roster \`${rosterName}\` does NOT exist`,
                flags: MessageFlags.Ephemeral,
            });

        const embed = new EmbedBuilder()
            .setTitle(`${rosterName} Roster`)
            .setTimestamp()
            .setColor(0xa1c6e8)
            .setAuthor({
                name: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
            })
            .setFooter({
                text: client.user.tag,
                iconURL: client.user.displayAvatarURL(),
            });

        roster.members.sort((member) => member.role).forEach((member) => {
            embed.addFields({
                name: `${interaction.guild.members.cache.get(member.id).user.username}`,
                value: `\`${member.role}\``
            });
        });

        interaction.reply({
            embeds: [embed],
        });
    },
};
