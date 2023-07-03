const i18next = require('i18next');
const User = require('@lumia/schemas/user');
const UserService = require('@lumia/models/index');

const userService = new UserService(User);

async function setLang(userId, lang) {
  const user = await userService.findOneAndUpdate({ userId }, { lang }, { new: true });
    
  i18next.changeLanguage(user.lang);
}

module.exports = setLang;