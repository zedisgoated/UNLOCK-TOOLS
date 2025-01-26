const { PermissionFlagsBits, MessageFlags } = require('discord.js');
const Ticket = require('../models/Ticket');
require('colors');

async function closeTicket(interaction) {
    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageMessages)) return interaction.reply({
        content: 'This action is for staff only',
        flags: MessageFlags.Ephemeral
    });

    if (ticket) {
        try {
            await interaction.channel.delete();
            Ticket.findOneAndDelete({ channel: interaction.channel.id });
        } catch (err) {
            console.error(`Could NOT delete ticket at ${interaction.channel.name}! Please check my permissions`.red);
            interaction.reply({
                content: 'An error has occured. Please contact the support',
                flags: MessageFlags.Ephemeral
            });
        }
    } else {
        interaction.reply({
            content: 'An error has occured',
            flags: MessageFlags.Ephemeral
        });
    }
}

module.exports = closeTicket;