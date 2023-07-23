const { Guild, User } = require('../../schemas');

module.exports = async (client, message) => {
  const { apolloClient } = client;

  const { data } = await apolloClient.query({
    query: Guild,
    variables: {
      id: message.guild.id
    }
  });
  const { guild } = data;
  const prefix = guild.prefix || '.';

  if(!message.content.startsWith(prefix) || message.author.bot) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  
  const command = client.commands.get(commandName);
  
  if (!command) return;
  
  await apolloClient.query({
    query: User,
    variables: {
      id: message.author.id
    }
  });

  try {
    command.execute(client, message, args);
  } catch (error) {
    console.error('Erro ao executar o comando:', error);
  }
};