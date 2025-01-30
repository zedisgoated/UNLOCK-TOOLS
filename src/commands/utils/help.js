const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} = require("discord.js");

const { readdirSync } = require("fs");
const { join } = require("path");

module.exports = {
    category: "utils",
    permissions: [],
    usage: "[command]",
    aliases: [],
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Displays help menu or infos for a specific command")
        .addStringOption((option) =>
            option
                .setName("command")
                .setDescription("The command you want to display infos")
        ),
    async run(interaction, client) {
        let command = interaction.options.getString("command");

        if (!command) {
            const embed = new EmbedBuilder()
                .setTitle("Help")
                .setDescription(
                    "Please select a category or type `/help <command>` for more informations"
                )
                .setColor("#a1c6e8")
                .setImage(
                    "https://images.alphacoders.com/695/thumb-1920-69561.jpg"
                )
                .setFooter({
                    text: client.user.tag,
                    iconURL: client.user.displayAvatarURL(),
                })
                .setTimestamp();

            const select = new StringSelectMenuBuilder()
                .setCustomId("help")
                .setPlaceholder("Select category");

            client.commands
                .filter((cmd) => cmd.category)
                .forEach((cmd) => {
                    if (
                        !select.options.find(
                            (option) => option.data.label === cmd.category
                        )
                    ) {
                        select.addOptions(
                            new StringSelectMenuOptionBuilder()
                                .setDefault(false)
                                .setDescription(
                                    `Commands of ${cmd.category} category`
                                )
                                .setLabel(`${cmd.category}`)
                                .setValue(`${cmd.category}`)
                        );
                    }
                });

            const row = new ActionRowBuilder().addComponents(select);

            await interaction.reply({
                embeds: [embed],
                components: [row]
            });
        } else {
            command = client.commands.get(command);

            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(command.data.name)
                        .setColor("#a1c6e8")
                        .setTimestamp()
                        .setThumbnail(
                            "https://images.alphacoders.com/695/thumb-1920-69561.jpg"
                        )
                        .setAuthor({
                            name: interaction.user.username,
                            iconURL: interaction.user.displayAvatarURL(),
                        })
                        .setFooter({
                            text: client.user.tag,
                            iconURL: client.user.displayAvatarURL(),
                        })
                        .setDescription(command.data.description)
                        .addFields(
                            {
                                name: "Category",
                                value: `\`${command.category}\``,
                                inline: true,
                            },
                            {
                                name: "Permissions",
                                value: command.permissions.join(", ")
                                    ? `\`${command.permissions.join(", ")}\``
                                    : "`None`",
                                    inline: true
                            },
                            {
                                name: "Usage",
                                value: command.usage ? `\`${command.usage}\`` : "`None`",
                                inline: true
                            },
                            {
                                name: "Aliases",
                                value: command.aliases.join(", ")
                                    ? `\`${command.aliases.join(", ")}\``
                                    : "`None`",
                                inline: true,
                            }
                        ),
                ],
            });
        }
    },
};

const commandDirsPath = join(__dirname, "../../commands");
const commandDirs = readdirSync(commandDirsPath);

for (const dir of commandDirs) {
    const commandDirPath = join(__dirname, `../../commands/${dir}`);
    const commandFiles = readdirSync(commandDirPath).filter((file) =>
        file.endsWith(".js")
    );

    for (const file of commandFiles) {
        const commandPath = join(__dirname, `../../commands/${dir}/${file}`);
        const command = require(commandPath);

        module.exports.data.options
            .find((option) => option.name === "command")
            .addChoices({
                name: command.data.name,
                value: command.data.name,
            });
    }
}
