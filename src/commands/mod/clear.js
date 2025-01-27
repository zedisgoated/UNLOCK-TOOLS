const { SlashCommandBuilder, PermissionFlagsBits, MessageFlags } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clear messages')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option
                .setName('amount')
                .setDescription('The amount of messages you want to delete')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(100)
        ),
    async run(interaction) {
        const amount = interaction.options.getInteger('amount');

        try {
            const { size } = await interaction.channel.bulkDelete(amount);

            interaction.reply({
                content: `Successfully deleted **${size}** messages`,
                flags: MessageFlags.Ephemeral
            });
        } catch {
            interaction.reply({
                content: 'Could NOT clear messages, please check my permissions',
                flags: MessageFlags.Ephemeral
            });
        }
    }
}