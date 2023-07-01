const { EmbedBuilder } = require('discord.js');

function constructToEmbed(title = '') {
  return new EmbedBuilder()
    .setTitle(title);
}

module.exports = constructToEmbed;