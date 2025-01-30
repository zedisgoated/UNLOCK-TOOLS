const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");

module.exports = {
    category: 'admin',
    permissions: ['Manage Channels'],
    usage: '[channel]',
    aliases: ['clone'],
    data: new SlashCommandBuilder()
        .setName('renew')
        .setDescription('Renews a channel')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('The channel you want to renew')
        ),
    async run(interaction) {
        const channel = interaction.options.getChannel('channel') || interaction.channel;

        try {
            const newChannel = await channel.clone();
            await newChannel.send(`Channel renewed ${interaction.user}`).then((m) => {
                setTimeout(() => {
                    m.delete().catch(() => {});
                }, 3000);
            });
            await channel.delete();
        } catch {
            interaction.reply({
                content: 'Could NOT renew this channel! Please contact support.',
                flags: MessageFlags.Ephemeral
            }).catch(() => {});
        }
    }
}