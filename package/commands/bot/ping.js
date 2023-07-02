const User = require('@lumia/schemas/user');

module.exports = {
  name: 'ping',
  description: 'Descrição do comando',
  async execute(client, message) {
    const { t } = client;

    const user = await User.findOne({ userId: message.author.id });

    return message.reply({ content: t('ping', { ping: client.ws.ping, lng: user.lang }) });
  },
};