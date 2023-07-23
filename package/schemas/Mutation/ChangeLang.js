const { gql } = require('graphql-tag');

const ChangeLang = gql`mutation ChangeLang($input: inputLang!) {
  changeLang(input: $input) {
    id
    lang
  }
}`;

module.exports = ChangeLang;