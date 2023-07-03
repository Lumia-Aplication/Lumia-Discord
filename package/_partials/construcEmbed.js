const { EmbedBuilder } = require('discord.js');

function constructToEmbed(user, title = '', description = '', footer = '', color = '#FFB347', ...fields) {
  const embed = new EmbedBuilder()
    .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }))
    .setTitle(title)
    .setDescription(description)
    .setColor(color.replace('skip', '#FFB347'))
    .setTimestamp();
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