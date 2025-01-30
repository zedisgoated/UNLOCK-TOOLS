const { SlashCommandBuilder } = require('discord.js');
const { readFileSync } = require('fs');

module.exports = {
    category: "fun",
    permissions: [],
    usage: null,
    aliases: ['gamberge', 'gingembre', 'citation'],
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Ca fait réfléchir'),
    run(interaction) {
        const quotes = readFileSync('quotes.txt').toString().split('\n');
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        interaction.reply(randomQuote);
    }
}