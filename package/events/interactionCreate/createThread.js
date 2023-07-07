const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ChannelType } = require('discord.js');
const {messageDelete} = require('../../_partials');
const { ButtonBuilder } = require('@discordjs/builders');
          
module.exports = async (client, interaction) => {

  if (interaction.customId === 'thread') {
    await interaction.deferUpdate();
    const channel = interaction.channel;
    const user = interaction.user;
    
    const thread = await channel.threads.create({
      name: `Ticket-${interaction.user.id}`,
      autoArchiveDuration: 60,
      type: ChannelType.PrivateThread
    });

    const confirmThreadCreate = await interaction.channel.send({ content: `O topico <#${thread.id}> foi criado!` });
    messageDelete(confirmThreadCreate, 5000);
        
    thread.members.add(user);
    interaction.guild.members.cache.forEach((Helper) => {
      if(Helper.roles.id === '1126583508157075516') {
        thread.members.add(Helper);
      }
    });
        
    const msg = await thread.send('Escolha um nome para este `Tópico!`');
        
    const filter = (m) => m.author.id === interaction.user.id;
    const collector = msg.channel.createMessageCollector({ filter, max: 1 });
        
    collector.on('collect', async (message) => {
      const threadName = await message.content;
      messageDelete(message, 0);
      messageDelete(msg, 0);
      await thread.setName(threadName);

      const helperRole = channel.guild.roles.cache.find((role) => role.name === 'Helper');
      if (helperRole) {
        const final = new ActionRowBuilder().addComponents( new ButtonBuilder()
          .setCustomId('Finalizar')
          .setLabel('Fechar')
          .setEmoji({id: '1126590491237040221'})
          .setStyle(ButtonStyle.Primary)
        );

        const embed = new EmbedBuilder()
          .setColor('#FFB347')
          .setTitle('Tópico de Ajuda')
          .setThumbnail(interaction.user.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }))
          .setTimestamp()
          .setFooter({ text: interaction.guild.name })
          .addFields({ name: 'Nome do Tópico:', value: threadName, inline: false })
          .addFields({ name: 'Autor do Tópico:', value: interaction.user.username, inline: false })
          .addFields({ name: 'Cargo selecionado para ajudar:', value: '<@&1126583508157075516>' });

        await thread.join(interaction.user.id, { roles: [helperRole.id] });
        await thread.send({content: `<@&${helperRole.id}>`, embeds: [embed], components: [final]});
      } else {
        const msg = await channel.send('Não foi encontrado o cargo');
        messageDelete(msg, 2000).catch(e => {null, e;});
      }
    });
  }
  if(interaction.customId === 'Finalizar'){
    const thread = interaction.channel;
    thread.delete().catch(e => {null, e;});
  }
};