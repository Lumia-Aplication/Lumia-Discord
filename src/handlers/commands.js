const { glob } = require('glob');

module.exports = async (client) => {

  const allFiles = await glob('package/commands/**/*.js');
  
  for (const file of allFiles) {
    const command = require(`../../${file}`);
    client.commands.set(command.name, command);

    if (command.aliases) {
      for (const alias of command.aliases) {
        client.commands.set(alias, command);
      }
    }
  }
};
