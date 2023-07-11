const { ButtonBuilder } = require("@discordjs/builders")
const { EmbedBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js")

module.exports = {
  name: 'test',
  description: 'Reação',
  async execute(client, message) {

    const embed = new EmbedBuilder()
    .setTitle('teste')
    .setDescription('apenas testando')

    const buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setCustomId('EN')
        .setLabel('en')
        .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
        .setCustomId('PT')
        .setLabel('pt')
        .setStyle(ButtonStyle.Secondary)
    )

    await message.channel.send({embeds: [embed], components: [buttons]})

  }
}
