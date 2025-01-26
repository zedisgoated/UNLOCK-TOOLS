const { MessageFlags } = require('discord.js');

function answerCommand(interaction, client) {
    const command = client.commands.get(interaction.commandName);

    if (!command) return interaction.reply({
        content: 'An error has occured. Please contact an administrator.',
        flags: MessageFlags.Ephemeral
    });

    command.run(interaction, client);
}

module.exports = answerCommand;