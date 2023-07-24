const { gql } = require('graphql-tag');

const Usages = gql`mutation Mutation($id: String!) {
    usages(id: $id) {
      guildId
      lastReset
      prefix
      usages
    }
  }`;

module.exports = Usages;