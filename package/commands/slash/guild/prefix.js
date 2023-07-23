const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const { ChangePrefix, User } = require('../../../schemas');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('prefix')
    .setDescription('Replies with Pong!')
    .addStringOption((option) => 
      option.setName('set')
        .setDescription('Sete um novo prefixo ao bot!')
        .setRequired(true)),
  async execute(client, interaction) {
    const { apolloClient, t } = client;

    const { data } = await apolloClient.query({
      query: User,
      variables: {
        id: interaction.user.id
      }
    });
    const { user } = data;

    if(!interaction.guild.members.cache.get(interaction.user.id).permissions.has([[PermissionFlagsBits.Administrator]])) {
      return interaction.reply({ content: t('setPrefix.permission', { lng: user.lang }), ephemeral: true });
    }

    const newPrefix = interaction.options.getString('set') ?? t('setPrefix.required', { lng: user.lang });

    try {
      const input = {
        id: interaction.user.id,
        prefix: newPrefix,
      };

      const dataPrefix = await apolloClient.mutate({
        mutation: ChangePrefix,
        variables: {
          input
        }
      });
      const guildPrefix = dataPrefix.data.ChangePrefix;

      await interaction.reply(t('setPrefix.success', { lng: user.lang, prefix: guildPrefix.prefix })); 
    } catch(e) {
      console.error(e);
      return interaction.reply({ content: t('setPrefix.error'), ephemeral: true });
    }
  },
};