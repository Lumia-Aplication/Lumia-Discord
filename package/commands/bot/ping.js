module.exports = {
  name: 'ping',
  description: 'Descrição do comando',
  execute(client, message, args, database) {
    return message.channel.send(`Pong: ${client.ws.ping}`);
  },
};