const { ButtonBuilder, ActionRowBuilder } = require('@discordjs/builders');
const { EmbedBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  name: 'embedhelper',
  description: 'Descrição',
  private: true,
  async execute(client, message) {
    //if(client.users.id !== '846047927700946944') return;
    
    const embed = new EmbedBuilder()
      .setTitle('<:mod_orange:1126980156267962518> Canal de Ajuda')
      .setDescription('Está procurando por ajuda, tem alguma dúvida? abra um ticket!')
      .addFields({ name: 'Como funciona:', value: 'Ao reagir no botão irá ser criado um tópico, onde apenas você e as pessoas com o cargo de Helper poderão ver' })
      .addFields({ name: 'Horário de atendimento:', value: 'Não há um horário especificado de atendimento, mas peço que seja paciente até um de nossos ajudantes o auxiliar!' })
      .setColor('#FFB347');

    const button = new ActionRowBuilder().addComponents(new ButtonBuilder()
      .setCustomId('thread')
      .setEmoji({ id: '965286779030761503' })
      .setStyle(ButtonStyle.Primary)
      .setLabel('Ajuda')
    );

    message.channel.send({embeds: [embed], components: [button]});
  }
};