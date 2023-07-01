const { ButtonBuilder, ButtonStyle } = require('discord.js');

function constructToButton(buttons) {

  const discordButtons = [];
  
  for (const buttonInfo of buttons) {
    const { customId, label } = buttonInfo;
    const button = new ButtonBuilder()
      .setCustomId(customId)
      .setLabel(label)
      .setStyle(ButtonStyle.Primary);
  
    discordButtons.push(button);
  }
  
  return discordButtons;
}

module.exports = constructToButton;
  