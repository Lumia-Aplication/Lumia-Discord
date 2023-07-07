const { ButtonBuilder, ActionRowBuilder } = require("@discordjs/builders");
const { EmbedBuilder, ButtonStyle, PermissionFlagsBits } = require("discord.js");

module.exports = {
    name: 'test',
    description: 'Descrição',
    async execute(client, message) {
    //if(client.users.id !== '846047927700946944') return;
    
    const embed = new EmbedBuilder()
    .setTitle('Proucura ajuda?')
    .setDescription('Para ter ajudar do cargo INDEFINIDO, clique no botão abaixo e escreva o nome da sua thread/topico e espere a ajuda.')
    .setColor('#FFB347')

    const button = new ActionRowBuilder().addComponents(new ButtonBuilder()
    .setCustomId('thread')
    .setEmoji({ id: '1126590371724525568' })
    .setStyle(ButtonStyle.Primary)
    .setLabel('Ajuda')
)

    message.channel.send({embeds: [embed], components: [button]})
    }
  }