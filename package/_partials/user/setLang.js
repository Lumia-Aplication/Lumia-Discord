const User = require('@lumia/schemas/user.js');
const i18next = require('i18next');

async function setLang(userId, lang) {
  const user = await User.findOneAndUpdate({ userId }, { lang }, { new: true });
    
  i18next.changeLanguage(user.lang);
}

module.exports = setLang;