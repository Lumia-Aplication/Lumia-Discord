const { Collection } = require('discord.js');

const i18n = require('../modules/i18n');

const { apolloClient } = require('../modules/apollo');


function configureAtributes(client) {
  client.commands = new Collection();
  client.slashs = new Collection();
  client.alias = new Collection();
  
  client.t = i18n.t;
  client.apolloClient = apolloClient;
  
}

module.exports = configureAtributes;