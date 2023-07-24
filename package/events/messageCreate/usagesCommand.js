const { Guild, Usages } = require('../../schemas');

module.exports = async (client, message) => {
  const { apolloClient } = client;    
  
  const { data } = await apolloClient.query({
    query: Guild,
    variables: {
      id: message.guild.id
    }
  });
  const { guild } = data;

  const args = message.content.slice(guild.prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName);

  if(command) {
    await apolloClient.mutate({
      mutation: Usages,
      variables: {
        id: message.guild.id
      }
    });
  }



};