module.exports = {
  name: 'ping',
  description: 'Descrição do comando',
  execute(client, message) {
    const { t } = client;

    return message.reply({ content: t('ping', { ping: client.ws.ping }) });
  },
};