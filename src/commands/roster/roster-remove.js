const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");
const Roster = require('../../models/Roster');

module.exports = {
    category: 'roster',
    permissions: ['Manage Roles'],
    usage: '<roster> <member>',
    aliases: [],
    data: new SlashCommandBuilder()
        .setName('roster-remove')
        .setDescription('Removes a member to a roster')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles)
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('The roster\'s name')
                .setRequired(true)
        )
        .addUserOption(option =>
            option
                .setName('member')
                .setDescription('The member you want to add to a roster')
                .setRequired(true)
        ),
    async run(interaction) {
        const rosterName = interaction.options.getString('name');
        const member = interaction.options.getUser('member');

        const roster = await Roster.findOne({ name: rosterName });

        if (!roster) return interaction.reply({
            content: `Roster \`${rosterName}\` does NOT exist`,
            flags: MessageFlags.Ephemeral
        });

        if (!roster.members.find((m) => m.id === member.id)) return interaction.reply({
            content: `${member} is NOT in roster \`${rosterName}\``,
            flags: MessageFlags.Ephemeral
        });

        const memberIndex = roster.members.indexOf(roster.members.find((m) => m.id === member.id));
        roster.members.splice(memberIndex, 1);

        await roster.save();

        interaction.reply(`${member} has been successfully revmoed from roster \`${rosterName}\``);
    }
}