const { User } = require('../../../schemas');

module.exports = {
  name: 'ping',
  description: 'Descrição do comando',
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