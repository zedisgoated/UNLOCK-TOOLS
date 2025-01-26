const { PermissionFlagsBits, MessageFlags } = require('discord.js');
const Ticket = require('../models/Ticket');
require('colors');

async function closeTicket(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) return interaction.reply({
        content: 'This action is for staff only',
        flags: MessageFlags.Ephemeral
    });

    await Ticket.findOneAndDelete({ channel: interaction.channel.id });
    interaction.channel.delete().catch(() => {});
}

module.exports = closeTicket;