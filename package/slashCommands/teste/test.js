module.exports = {
  name: 'pong',
  description: 'Descrição do comando',
  async execute(client, message) {
    console.log(client,message);
    return client.reply('ping');
  },
};