const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ButtonBuilder, ButtonStyle, MessageFlags } = require("discord.js");
const date = require('date-and-time');
const { ActionRowBuilder } = require("@discordjs/builders");

module.exports = {
    category: 'admin',
    permissions: ['Manage Channels'],
    usage: '[channel]',
    aliases: [],
    data: new SlashCommandBuilder()
        .setName('ticket-setup')
        .setDescription('Setup the ticket system')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('The channel where the ticket system will be set up')
        ),
    async run(interaction, client) {
        const channel = interaction.options.getChannel() || interaction.channel;

        try {
            await channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('Tickets')
                        .setDescription('Click on the button below to contact support')
                        .setColor('#a1c6e8')
                        .setFooter({
                            iconURL: client.user.displayAvatarURL(),
                            text: client.user.tag
                        })
                        .setImage('https://images.alphacoders.com/695/thumb-1920-69561.jpg')
                        
                ],
                components: [
                    new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('open-ticket')
                                .setEmoji('📨')
                                .setLabel('Contact support')
                                .setStyle(ButtonStyle.Primary)
                        )
                ]
            });

            interaction.reply({
                content: `Ticket system has been successfully set up in ${channel}!`,
                flags: MessageFlags.Ephemeral
            });
        } catch (err) {
            interaction.reply({
                content: `Could NOT open ticket in channel ${channel}!\nPlease check my permissions`,
                flags: MessageFlags.Ephemeral
            });

            console.log(err);
        }
    }
}