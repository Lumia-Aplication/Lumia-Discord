const i18next = require('i18next');
const { ChangeLang } = require('../../schemas');
const { apolloClient } = require('@lumia/modules/apollo.js');

async function setLang(id, lang) {
  const input = { id, lang };

  const { data } = await apolloClient.mutate({
    mutation: ChangeLang,
    variables: {
      input
    }
  });
  const { changeLang } = data;
  i18next.changeLanguage(changeLang.lang);
}

module.exports = setLang;