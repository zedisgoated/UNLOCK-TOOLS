const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");
const Roster = require('../../models/Roster');

module.exports = {
    category: 'roster',
    permissions: ['Manage Roles'],
    usage: '<name> <game>',
    aliases: ['new'],
    data: new SlashCommandBuilder()
        .setName('roster-create')
        .setDescription('Creates a new roster')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Roster\'s name')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('game')
                .setDescription('Roster\'s game')
                .setRequired(true)
                .addChoices({
                    name: 'Valorant',
                    value: 'vlr'
                }, {
                    name: 'League of Legends',
                    value: 'lol'
                })
        ),
    async run(interaction) {
        const rosterName = interaction.options.getString('name');
        const rosterGame = interaction.options.getString('game');

        const roster = await Roster.findOne({ name: rosterName });

        if (roster) return interaction.reply({
            content: `Roster \`${rosterName}\` already exists`,
            flags: MessageFlags.Ephemeral
        });

        await new Roster({ name: rosterName, game: rosterGame }).save();

        interaction.reply(`Roster \`${rosterName}\` created`);
    }
}