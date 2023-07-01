const { ActionRowBuilder } = require('discord.js');

function constructToActionRow(components) {
  return new ActionRowBuilder()
    .addComponents(components);
}

module.exports = constructToActionRow;