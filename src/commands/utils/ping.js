const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    category: 'utils',
    permissions: [],
    usage: null,
    aliases: ['latency'],
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Displays latency'),
    run(interaction, client) {
        interaction.reply({ content: 'Calculating...', withResponse: true }).then(async (i) => {
            const ping = await i.resource.message.createdTimestamp - interaction.createdTimestamp;
            interaction.editReply(`Latency: \`${ping}\`\nAPI: \`${client.ws.ping}\``);
        });
    }
}