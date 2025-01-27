const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Unlock channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('The channel you want to unlock')
        ),
    async run (interaction) {
        const channel = interaction.options.getChannel('channel') || interaction.channel;

        try {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone.id, {
                SendMessages: null
            });

            interaction.reply('The channel has been unlocked');
        } catch {
            interaction.reply({
                content: 'Could NOT unlock channel, please check my permissions',
                flags: MessageFlags.Ephemeral
            });
        }
    }
}