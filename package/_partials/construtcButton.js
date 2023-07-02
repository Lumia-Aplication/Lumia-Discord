const { ButtonBuilder } = require('discord.js');

function constructToButton(buttons) {

  const discordButtons = [];
  
  for (const buttonInfo of buttons) {
    const { customId, label, color, icon } = buttonInfo;
    const button = new ButtonBuilder()
      .setCustomId(customId)
      .setLabel(label)
      .setEmoji(icon)
      .setStyle(color);
  
    discordButtons.push(button);
  }
  
  return discordButtons;
}

module.exports = constructToButton;
  