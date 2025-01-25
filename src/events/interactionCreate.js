const { MessageFlags } = require("discord.js");

module.exports = {
    name: 'interactionCreate',
    run(interaction, client) {

        if (interaction.isChatInputCommand()) {

            const command = client.commands.get(interaction.commandName);

            if (!command) return interaction.reply({
                content: 'An error has occured. Please contact an administrator.',
                flags: MessageFlags.Ephemeral
            });

            client.commands.run(interaction, client);

        }
    }
}