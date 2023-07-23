const { gql } = require('graphql-tag');

const ChangePrefix = gql`mutation ChangePrefix($input: inputPrefix!) {
    changePrefix(input: $input) {
      guildId
      lastReset
      usages
      prefix
    }
  }`;

module.exports = ChangePrefix;