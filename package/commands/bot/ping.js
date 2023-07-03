module.exports = {
  name: 'ping',
  description: 'Descrição do comando',
  async execute(client, message) {
    const { t, userService } = client;

    const user = await userService.findOne({ userId: message.author.id});

    return message.reply({ content: t('ping', { ping: client.ws.ping, lng: user.lang }) });
  },
};