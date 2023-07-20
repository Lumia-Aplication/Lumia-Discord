const { glob } = require('glob');
const { REST, Routes } = require('discord.js');
require('dotenv').config();

const token = process.env.TOKEN;

module.exports = async (client) => {
  const slashCommands = [];
  const slashCommandsFiles = await glob('package/commands/slash/**/*.js');

  for (const file of slashCommandsFiles)  {
    const command = require(`../../../${file}`);
    if ('data' in command && 'execute' in command) {
      slashCommands.push(command.data.toJSON());
    } else {
      console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
    }
  }

  const rest = new REST().setToken(token);
  
  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: slashCommands }
    );
  
    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
};