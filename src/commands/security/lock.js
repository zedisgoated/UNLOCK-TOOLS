const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Lock channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('The channel you want to lock')
        ),
    async run (interaction) {
        const channel = interaction.options.getChannel('channel') || interaction.channel;

        try {
            await channel.permissionOverwrites.edit(interaction.guild.roles.everyone.id, {
                SendMessages: false
            });

            interaction.reply('The channel has been locked');
        } catch {
            interaction.reply({
                content: 'Could NOT lock channel, please check my permissions',
                flags: MessageFlags.Ephemeral
            });
        }
    }
}