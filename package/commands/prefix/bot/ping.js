const { User } = require('../../../schemas');

module.exports = {
  name: 'ping',
  aliases: ['pong', 'latency', 'latencia'],
  category: 'Bot',
  use: '<prefix>ping',
  description: 'command.description.ping',
  async execute(client, message) {
    const { t, apolloClient } = client;

    const { data } = await apolloClient.query({
      query: User,
      variables: {
        id: message.author.id
      }
    });
    const { user } = data;

    return message.reply({ content: t('ping', { ping: client.ws.ping, lng: user.lang }) });
  },
};