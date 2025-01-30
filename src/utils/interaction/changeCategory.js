const { EmbedBuilder } = require("discord.js");
const { readdirSync } = require('fs');
const { join } = require('path');

module.exports = async (interaction) => {
    const category = interaction.values[0];

    const embed = new EmbedBuilder(interaction.message.embeds[0]);
    embed.setDescription(`Commands of ${category} category`);
    embed.setFields();

    const commandDirPath = join(__dirname, `../../commands/${category}`);
    const commandFiles = readdirSync(commandDirPath).filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
        const commandPath = join(__dirname, `../../commands/${category}/${file}`);
        const command = require(commandPath);
        
        embed.addFields({
            name: command.data.name,
            value: `\`${command.data.description}\``
        });
    }


    interaction.update({ embeds: [embed] });
}