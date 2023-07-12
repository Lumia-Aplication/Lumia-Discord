module.exports = async (client, interaction) => {
  await interaction.deferUpdate();
  if (interaction.customId === 'EN'){
    interaction.roles?.add('1122720820356206653');
  } else if (interaction.customId === 'PT'){
    interaction.roles?.add('1122720618878599218');
  }
};