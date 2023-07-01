const { constructToActionRow, constructToButton, constructToEmbed } = require('../../_partials');
const setLang = require('../../_partials/guild/setLang');
const User = require('@lumia/schemas/user.js');

module.exports = {
  name: 'setlang',
  description: 'Setar uma linguagem ao usuario',
  async execute(client, message) {
    const buttons = [
      {
        label: 'Portugues(BR)',
        customId: 'br'
      },
      {
        label: 'Inglês(en)',
        customId: 'en'
      }
    ];
    const user = await User.findOne({ userId: message.author.id });
    const button = constructToButton(buttons);
    const row = constructToActionRow(button);
    const embed = constructToEmbed(`Selecione sua linguagem, atual: ${user.lang}`);
  
    const messageChannel = await message.reply({ embeds: [embed], components: [row] });
    
    const filter = (interaction) => interaction.isButton() && interaction.user.id === message.author.id;

    const collector = messageChannel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async (interaction) => {
      if (interaction.customId == 'br') {
        await setLang(interaction.user.id, 'br');
        await interaction.deferUpdate();
        return message.channel.send({ content: 'Linguagem alterada para Portugues(BR)', ephemeral: true });
      } else if (interaction.customId == 'en') {
        await setLang(interaction.user.id, 'en');
        await interaction.deferUpdate();
        return message.channel.send({ content: 'Linguagem alterada para Inglês(EN)', ephemeral: true });
      }
    });

    collector.on('end', () => {
      messageChannel.delete();
      return message.channel.send({ content: 'Tempo para selecionar acabou', ephemeral: true });
    });
  }
};