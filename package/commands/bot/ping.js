const constructToEmbed = require('../../_partials/construcEmbed');

module.exports = {
  name: 'ping',
  description: 'Descrição do comando',
  execute(client, message, args, database) {
    const embed = constructToEmbed(`🏓 Pong: ${client.ws.ping}!`);
    return message.reply({ embeds: [embed]});
  },
};