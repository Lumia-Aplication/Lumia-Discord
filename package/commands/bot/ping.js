const constructToEmbed = require('../../_partials/construcEmbed');

module.exports = {
  name: 'ping',
  description: 'Descrição do comando',
  execute(client, message) {
    const { t } = client;

    const embed = constructToEmbed(t('ping', { ping: client.ws.ping }));
    return message.reply({ embeds: [embed]});
  },
};