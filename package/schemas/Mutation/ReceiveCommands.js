const { gql } = require('graphql-tag');

const ReceiveCommands = gql`mutation ReceiveCommands($input: [inputCommands]) {
    receiveCommands(input: $input) {
      name
      category
      aliases
      description
      use
    }
  }`;

module.exports = ReceiveCommands;