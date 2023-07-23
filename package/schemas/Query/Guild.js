const { gql } = require('graphql-tag');

const Guild = gql`query Guild($id: String!) {
    guild(id: $id) {
      guildId
      prefix
      usages
      lastReset
    }
  }`;

module.exports = Guild;