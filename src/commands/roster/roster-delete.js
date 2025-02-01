const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");
const Roster = require('../../models/Roster');

module.exports = {
    category: 'roster',
    permissions: ['Manage Roles'],
    usage: '<name>',
    aliases: [],
    data: new SlashCommandBuilder()
        .setName('roster-delete')
        .setDescription('Deletes a roster')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Roster\'s name')
                .setRequired(true)
        ),
    async run(interaction) {
        const rosterName = interaction.options.getString('name');
        const exists = await Roster.findOne({ name: rosterName });
        if (!exists) return interaction.reply({
            content: 'Roster does NOT exist',
            flags: MessageFlags.Ephemeral
        });
        await Roster.deleteOne({ name: rosterName });
        interaction.reply(`Roster \`${rosterName}\` deleted`);
    }
}
