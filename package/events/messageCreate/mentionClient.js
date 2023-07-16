const { messageDelete } = require('../../_partials');

module.exports = async (client, message) => {
  
  if(message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
    
    const { userService, guildService, t } = client;
    const { prefix } = await guildService.findOne({ guildId: message.guild.id });
    const user = await userService.findOne({ userId: message.author.id });

    const msg = await message.reply(t('mentionPrefix.index', { lng: user.lang, prefix }));
    messageDelete(msg, 8000);
  }
};
