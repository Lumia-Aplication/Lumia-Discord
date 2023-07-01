const { glob } = require('glob');
const { parse } = require('path');

module.exports = async (client) => {

  const eventFiles = await glob('package/events/**/*.js');

  for (const file of eventFiles) {
    const event = require(`../../${file}`);

    const eventName = parse(file).name;
    
    client.on(eventName, event.bind(null, client));
  }
};
