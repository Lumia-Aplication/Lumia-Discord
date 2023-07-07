module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { guildService, userService } = client;

  const guild = await guildService.findOne({ guildId: interaction.guild.id });
  const user = await userService.findOne({ userId: interaction.user.id });
  
  if(!guild) await guildService.create({ guildId: interaction.guild.id });
  if(!user) await userService.create({ userId: interaction.user.id });

  const command = client.slashs.get(interaction.commandName);
  
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }
  try {
    await command.execute(client, interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
    } else {
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
  }
};