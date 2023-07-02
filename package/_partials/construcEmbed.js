const { EmbedBuilder } = require('discord.js');

function constructToEmbed(user, title = '', description = '', color = '#FFB347') {
  return new EmbedBuilder()
    .setThumbnail(user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }))
    .setTitle(title)
    .setDescription(description || '')
    .setColor(color || '#FFB347')
    .setTimestamp();
}

module.exports = constructToEmbed;