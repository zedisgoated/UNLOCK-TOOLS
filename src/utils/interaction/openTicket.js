const { MessageFlags, EmbedBuilder, ActionRowBuilder, ButtonBuilder, PermissionFlagsBits, ChannelType, ButtonStyle } = require('discord.js');
const Ticket = require('../../models/Ticket');
require('dotenv').config();

const ticketParentId = process.env.TICKET_PARENT_ID;
const staffRoleId = process.env.STAFF_ROLE_ID;
const clientId = process.env.CLIENT_ID;

async function openTicket(interaction, client) {
    const ticket = await Ticket.findOne({ user: interaction.user.id });
    if (ticket) return interaction.reply({
        content: 'You can only open one ticket at a time!',
        flags: MessageFlags.Ephemeral
    });

    if (!interaction.guild.channels.cache.has(ticketParentId)) return interaction.reply({
        content: 'An error has occured, please contact support',
        flags: MessageFlags.Ephemeral
    });

    const ticketCount = await Ticket.countDocuments();

    try {
        interaction.guild.channels.create({
            name: `ticket-${ticketCount+1}`,
            type: ChannelType.GuildText,
            parent: ticketParentId,
            permissionOverwrites: [{
                id: clientId,
                allow: [
                    PermissionFlagsBits.ViewChannel,
                    PermissionFlagsBits.EmbedLinks,
                    PermissionFlagsBits.ManageChannels
                ]
            }, {
                id: staffRoleId,
                allow: PermissionFlagsBits.ViewChannel
            }, {
                id: interaction.user.id,
                allow: PermissionFlagsBits.ViewChannel
            }, {
                id: interaction.guild.roles.everyone,
                deny: PermissionFlagsBits.ViewChannel
            }]
        }).then(async (channel) => {
            try {
                await channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`ticket-${ticketCount + 1}`)
                            .setAuthor({
                                name: interaction.user.username,
                                iconURL: interaction.user.displayAvatarURL({ dynamic: true })
                            })
                            .setColor('#a1c6e8')
                            .setDescription(`Welcome to your ticket ${interaction.user.username}\nThe staff will take in charge your demand as soon as possible\nMake sure to describe your problem as much as possible`)
                            .setFooter({ text: client.user.tag, iconURL: client.user.displayAvatarURL() })
                            .setThumbnail('https://images.alphacoders.com/695/thumb-1920-69561.jpg')
                    ],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId('close-ticket')
                                    .setEmoji('🔒')
                                    .setLabel('Close ticket')
                                    .setStyle(ButtonStyle.Danger)
                            )
                    ]      
                });

                new Ticket({
                    channel: channel.id,
                    user: interaction.user.id
                }).save();

                interaction.reply({
                    content: `Your ticket has been successfully open at ${channel}!`,
                    flags: MessageFlags.Ephemeral
                }).catch(() => {});
            } catch {}
        });
    } catch (err) {
        interaction.reply({
            content: 'Could NOT open your ticket. Please contact support.',
            flags: MessageFlags.Ephemeral
        });
    }
}

module.exports = openTicket;