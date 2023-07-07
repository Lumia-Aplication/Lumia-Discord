const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('prefix')
    .setDescription('Replies with Pong!')
    .addStringOption((option) => 
      option.setName('set')
        .setDescription('Sete um novo prefixo ao bot!')
        .setRequired(true)),
  async execute(client, interaction) {
    const { guildService, userService, t } = client;

    const user = userService.findOne({ userId: interaction.user.id });

    if(!interaction.guild.members.cache.get(interaction.user.id).permissions.has([[PermissionFlagsBits.Administrator]])) {
      return interaction.reply({ content: t('setPrefix.permission', { lng: user.lang }), ephemeral: true });
    }

    const newPrefix = interaction.options.getString('set') ?? t('setPrefix.required', { lng: user.lang });

    try {
      const guildPrefix = await guildService.findOneAndUpdate({ guildId: interaction.guild.id }, { prefix: newPrefix });

      await interaction.reply(t('setPrefix.success', { lng: user.lang, prefix: guildPrefix.prefix })); 
    } catch(e) {
      console.error(e);
      return interaction.reply({ content: t('setPrefix.error'), ephemeral: true });
    }
  },
};