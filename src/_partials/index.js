const { glob } = require('glob');

async function loadHandlers(client) {
    
  const handlers = await glob('src/handlers/*.js');
  
  for (const file of handlers) {
    require(`../../${file}`)(client);
  }
}

async function loadModules() {
  const modules = await glob('src/modules/*.js');

  for (const file of modules) {
    require(`../../${file}`);
  }
}

module.exports = { loadHandlers, loadModules };
