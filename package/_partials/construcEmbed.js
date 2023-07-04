const { EmbedBuilder } = require('discord.js');

function constructToEmbed(data) {
  const { user, title, description, footer, ...fields } = data;

  const embed = new EmbedBuilder()
    .setTitle(String(title))
    .setDescription(String(description))
    .setColor('#FFB347')
    .setTimestamp();
  if(user) {
    embed.setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }));
  }
  if(footer) {
    embed.setFooter({ text: footer });
  }
  if (fields.length > 0) {
    for (const param of fields) {
      embed.addFields({ name: param.name, value: param.value, inline: param.inline });
    }
  }

  return embed;
}

module.exports = constructToEmbed;
