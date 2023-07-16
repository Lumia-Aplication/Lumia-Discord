module.exports = async (client, interaction) => {
  if (interaction.customId === 'guild_en') {

    await interaction.deferUpdate();
    interaction.member.roles?.add('1122720820356206653');
  } else if (interaction.customId === 'guild_br') {

    await interaction.deferUpdate();
    interaction.member.roles?.add('1122720618878599218');
  }
};