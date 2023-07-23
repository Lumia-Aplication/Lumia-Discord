const { Guild, User } = require('../../schemas');

module.exports = async (client, interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { apolloClient } = client;

  await apolloClient.query({
    query: Guild,
    variables: {
      id: interaction.guild.id
    }
  });
  await apolloClient.query({
    query: User,
    variables: {
      id: interaction.user.id
    }
  });

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