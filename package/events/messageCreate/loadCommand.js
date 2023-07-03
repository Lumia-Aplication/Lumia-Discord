const { database } = require('@lumia/client/database.js');
const User = require('@lumia/schemas/user.js');

const prefix = '.';

module.exports = async (client, message) => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  
  const command = client.commands.get(commandName);
  
  if (!command) return;
  const user = await User.findOne({ userId: message.author.id });
  if(!user) {
    await User.create({ userId: message.author.id });
    return message.reply({ content: 'Você foi adicionado ao banco de dados, execute novamente', ephemeral: true });
  }
  try {
    command.execute(client, message, args, database);
  } catch (error) {
    console.error('Erro ao executar o comando:', error);
  }
};