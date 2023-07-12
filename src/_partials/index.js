const { glob } = require('glob');


async function loadHandlers(client) {
    
  const handlers = await glob('src/handlers/*.js');
  
  for (const file of handlers) {
    require(`../../${file}`)(client);
  }
}

module.exports = loadHandlers;
