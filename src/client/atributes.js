const { Collection } = require('discord.js');

const i18n = require('../modules/i18n');

const User = require('../schemas/user');
const Guild = require('../schemas/guild');
const GuildService = require('../schemas');
const UserService = require('../schemas');

const userService = new UserService(User);
const guildService = new GuildService(Guild);

function configureAtributes(client) {
  client.commands = new Collection();
  client.slashs = new Collection();
  client.alias = new Collection();
  
  client.t = i18n.t;
  client.userService = userService;
  client.guildService = guildService;
  
}

module.exports = configureAtributes;