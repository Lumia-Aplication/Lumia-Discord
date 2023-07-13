const { messageDelete } = require('../../_partials');

module.exports = async (client, message) => {
  const { guildService } = client;
  const { prefix } = await guildService.findOne({ guildId: message.guild.id });

  if(message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
    const msg = await message.reply(`<:lumia:1129194383867133972> Meu prefixo neste servidor é: **\`${prefix}\`**`);
    messageDelete(msg, 8000);
  }
};
