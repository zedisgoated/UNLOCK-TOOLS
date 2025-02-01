const { REST, Routes } = require('discord.js');
const { readdirSync } = require('fs');
const { join } = require('path');
require('colors');
require('dotenv').config();

const token = process.env.TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const commands = [];
const commandDirsPath = join(__dirname, 'src/commands');
const commandDirs = readdirSync(commandDirsPath);

for (const dir of commandDirs) {
    const dirPath = join(__dirname, `src/commands/${dir}`);
    const commandFiles = readdirSync(dirPath).filter((file) => file.endsWith('.js'));

    for (const file of commandFiles) {
        const commandPath = join(__dirname, `src/commands/${dir}/${file}`);
        const command = require(commandPath);

        if ('data' in command && 'run' in command) {
            commands.push(command.data.toJSON());
            command.aliases.forEach((alias) => {
                command.data.name = alias;
                commands.push(command.data.toJSON());
            });
        } else {
            console.log(`[WARNING] The file at path ${commandPath} is missing required properties "data" or "run" and could NOT be loaded`.yellow);
        }
    }
}

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands...`);

        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands }
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands!`.green);
    } catch (err) {
        console.error(`An error as occured\n${err}`.red);
    }
})();