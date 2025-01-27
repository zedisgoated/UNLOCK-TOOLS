const {
    SlashCommandBuilder,
    MessageFlags,
    EmbedBuilder,
} = require("discord.js");

module.exports = {
    permissions: [],
    usage: "help [command]",
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Displays help menu")
        .addStringOption((option) =>
            option
                .setName("command")
                .setDescription("Displays help for a specific command")
        ),
    run(interaction, client) {
        let command = interaction.options.getString("command");

        if (!command) {
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
        } else {
            command = client.commands.get(command);

            if (!command)
                return interaction.reply({
                    content: "Command not found",
                    flags: MessageFlags.Ephemeral,
                });

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(command.data.name)
                        .setAuthor({
                            name: interaction.user.username,
                            iconURL: interaction.user.displayAvatarURL({
                                dynamic: true,
                            }),
                        })
                        .setDescription(command.data.description)
                        .addFields(
                            {
                                name: "Permissions",
                                value:
                                    command.permissions.length > 0
                                        ? command.permissions.join(" ; ")
                                        : "None",
                                inline: true,
                            },
                            {
                                name: "Usage",
                                value: command.usage || "None",
                                inline: true,
                            }
                        )
                        .setFooter({
                            text: 'Type "/help" for more informations',
                            iconURL: client.user.displayAvatarURL({
                                dynamic: true,
                            }),
                        }),
                ],
            });
        }
    },
};
