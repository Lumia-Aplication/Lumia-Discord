const { glob } = require('glob');

module.exports = async (client) => {

  const allFiles = await glob('package/slashCommands/**/*.js');
  for (const file of allFiles) {
    const command = require(`../../${file}`);

    client.slashs.set(command.data.name, command);
  }
};
