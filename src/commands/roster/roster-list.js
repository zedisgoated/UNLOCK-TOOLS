const { SlashCommandBuilder, MessageFlags } = require("discord.js");
const Roster = require("../../models/Roster");
const { EmbedBuilder } = require("@discordjs/builders");

module.exports = {
    category: "roster",
    permissions: [],
    usage: null,
    aliases: [],
    data: new SlashCommandBuilder()
        .setName("roster-list")
        .setDescription("Displays rosters list"),
    async run(interaction, client) {

        const rosters = await Roster.find();

        const embed = new EmbedBuilder()
            .setTitle(`Rosters list`)
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

        rosters.forEach((roster, index) => {
            if (index == 0) embed.data.description = `- \`${roster.name}\`\n`;
            else embed.data.description += `- \`${roster.name}\`\n`;
        });

        interaction.reply({
            embeds: [embed],
        });
    },
};
