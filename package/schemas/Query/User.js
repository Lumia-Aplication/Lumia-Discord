const { gql } = require('graphql-tag');

const User = gql`query User($id: String!) {
    user(id: $id) {
      id
      lang
    }
  }`;


module.exports = User;