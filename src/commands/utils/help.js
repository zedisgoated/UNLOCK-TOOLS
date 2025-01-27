const {
    SlashCommandBuilder,
    MessageFlags,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Displays help menu"),
    run(interaction, client) {
        const embed = new EmbedBuilder()
            .setTitle("Help")
            .setAuthor({
                name: interaction.user.username,
                iconURL: interaction.user.displayAvatarURL({
                    dynamic: true,
                }),
            })
            .setFooter({
                text: 'Type "/help <command>" for more informations',
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();

        client.commands.forEach((cmd) => {
            embed.addFields({
                name: cmd.data.name,
                value: cmd.data.description,
            });
        });

        interaction.reply({ embeds: [embed] });
    },
};
