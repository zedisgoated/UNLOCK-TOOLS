const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");
const Roster = require('../../models/Roster');

module.exports = {
    category: 'roster',
    permissions: ['Manage Roles'],
    usage: '<roster> <member>',
    aliases: [],
    data: new SlashCommandBuilder()
        .setName('roster-add')
        .setDescription('Adds a member to a roster')
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
        )
        .addStringOption(option =>
            option
                .setName('role')
                .setDescription('The member\'s role')
                .setRequired(true)
                .addChoices({
                    name: 'Manager',
                    value: 'Manager'   
                }, {
                    name: 'Head Coach',
                    value: 'Head Coach'   
                }, {
                    name: 'Assistant Coach',
                    value: 'Assistant Coach'   
                }, {
                    name: 'Mental Coach',
                    value: 'Mental Coach'
                }, {
                    name: 'Analyst',
                    value: 'Analyst'
                }, {
                    name: 'In-Game Leader',
                    value: 'In-Game Leader'
                }, {
                    name: 'Co-Lead',
                    value: 'Co-Lead'
                }, {
                    name: 'Player',
                    value: 'Player'
                })
        ),
    async run(interaction) {
        const rosterName = interaction.options.getString('name');
        const member = interaction.options.getUser('member');
        const role = interaction.options.getString('role');

        const roster = await Roster.findOne({ name: rosterName });

        if (!roster) return interaction.reply({
            content: `Roster \`${rosterName}\` does NOT exist`,
            flags: MessageFlags.Ephemeral
        });

        if (roster.members.find((m) => m.id === member.id)) return interaction.reply({
            content: `${member} is already in roster \`${rosterName}\``,
            flags: MessageFlags.Ephemeral
        });

        roster.members.push({
            id: member.id,
            role: role
        });

        await roster.save();

        interaction.reply(`${member} has been successfully added to roster \`${rosterName}\` as \`${role}\``);
    }
}