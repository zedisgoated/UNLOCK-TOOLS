const { SlashCommandBuilder, MessageFlags } = require("discord.js");

module.exports = {
    category: 'mod',
    permissions: ['Ban Members'],
    usage: '<ID>',
    aliases: [],
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('Unban an user')
        .addStringOption(option =>
            option
                .setMinLength(17)
                .setMaxLength(19)
                .setName('id')
                .setDescription('The user\'s ID you want to unban')
                .setRequired(true)
        ),
    async run(interaction) {
        const ID = interaction.options.getString('ID');
        try {
            await interaction.guild.bans.remove(ID);
            interaction.reply(`User with ID \`${ID}\` has been successfully unbanned`);
        } catch {
            interaction.reply({
                content: `Could NOT unban user with ID \`${ID}\`! Please check my permissions`,
                flags: MessageFlags.Ephemeral
            });
        }
    }
}