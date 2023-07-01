const { database } = require('@lumia/client/database.js');

const prefix = '.';

module.exports = (client, message) => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
      
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
        
  const command = client.commands.get(commandName);
      
  if (!command) return;
        
  try {
    command.execute(client, message, args, database);
  } catch (error) {
    console.error('Erro ao executar o comando:', error);
  }
};