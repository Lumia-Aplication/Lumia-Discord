const { StringSelectMenuBuilder } = require('discord.js');

function constructToSelectMenu(menus) {

  const selectsMenus = [];

  for (const itens of menus) {
    const { placeholder, customId, options } = itens;
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId(customId)
      .setPlaceholder(placeholder);
    for (const option of options) {
      const { label, description, value } = option;
      selectMenu.addOptions({
        label,
        description,
        value,
      });
    }

    selectsMenus.push(selectMenu);
  }
  return selectsMenus;
}

module.exports = constructToSelectMenu;