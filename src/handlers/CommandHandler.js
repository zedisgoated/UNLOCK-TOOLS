const { Collection } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
require('colors');

module.exports = (client) => {
    client.commands = new Collection();
    const commandDirsPath = join(__dirname, '../commands');
    const commandDirs = readdirSync(commandDirsPath);

    for (const dir of commandDirs) {
        const dirPath = join(__dirname, `../commands/${dir}`);
        const commandFiles = readdirSync(dirPath).filter((file) => file.endsWith('.js'));

        for (const file of commandFiles) {
            const commandPath = join(__dirname, `../commands/${dir}/${file}`);
            const command = require(commandPath);

            if ('data' in command && 'run' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The file at path ${commandPath} is missing required properties "data" or "run" and could NOT be loaded!`.yellow);
            }
        }
    }
}