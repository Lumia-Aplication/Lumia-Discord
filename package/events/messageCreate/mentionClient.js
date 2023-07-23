const { messageDelete } = require('../../_partials');
const { Guild, User } = require('../../schemas');

module.exports = async (client, message) => {
  
  if(message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
    
    const { t, apolloClient } = client;
    const guildData = await apolloClient.query({
      query: Guild,
      variables: {
        id: message.guild.id
      }
    });
    const userData = await apolloClient.query({
      query: User,
      variables: {
        id: message.author.id
      }
    });

    const lng = userData.data.user.lang;
    const prefix = guildData.data.guild.prefix;

    const msg = await message.reply(t('mentionPrefix.index', { lng, prefix }));
    messageDelete(msg, 8000);
  }
};
