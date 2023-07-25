const { removeDuplicates, removeItemFromArray } = require('../../_partials');
const { ReceiveCommands } = require('../../schemas');

module.exports = async (client) => {
  const { apolloClient } = client;

  const commands = client.commands.map((a) => a);
  const commandsNotDuplicated = removeDuplicates(commands);
  const input = removeItemFromArray(commandsNotDuplicated, 'private');

  await apolloClient.mutate({
    mutation: ReceiveCommands,
    variables: {
      input
    }
  });
  
};