const i18next = require('i18next');

const { br, en } = require('../locales/index');

i18next.init({
  resources: {
    en: {translation: en},
    br: {translation: br},
  },
  lng: 'br',
  fallbackLng: 'br',
  interpolation: {
    escapeValue: false,
  },
});

module.exports = i18next;