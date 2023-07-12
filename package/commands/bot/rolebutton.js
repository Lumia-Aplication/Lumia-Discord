const { ButtonBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'test',
  description: 'Reação',
  async execute(client, message) {

    const embed = new EmbedBuilder()
      // .setTitle(`Bem vindo(a) ao Servidor da ${client.user.username}\n
      // Welcome to the ${client.user.username} Server`)
      .setColor('#FFB347')
      .setDescription(`**Bem vindo(a) ao Servidor da ${client.user.username}**\n**Welcome to the ${client.user.username} Server**\n\n- Selecione sua linguagem para se comunicar no servidor\n- Select your language to communicate on the server`);

    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('EN')
        .setLabel('English')
        .setEmoji({ id: '1124894096570466344' })
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId('PT')
        .setLabel('Português(BR)')
        .setEmoji({ id: '1124893878554734706' })
        .setStyle(ButtonStyle.Success)
    );

    await message.channel.send({embeds: [embed], components: [buttons]});

  }
};
