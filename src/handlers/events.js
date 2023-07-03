const { glob } = require('glob');
const { parse, basename } = require('path');

module.exports = async (client) => {
  const eventFiles = await glob('package/events/**/*.js');

  for (const file of eventFiles) {
    const event = require(`../../${file}`);
    const eventPath = parse(file);
    const eventName = basename(eventPath.dir);

    client.on(eventName, event.bind(null, client));
  }
};