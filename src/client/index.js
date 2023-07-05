const { Client, GatewayIntentBits, Collection } = require('discord.js');
const User = require('../schemas/user');

require('dotenv').config();
require('./database');
require('./alias');

const i18n = require('./i18n');

const UserService = require('../models');
const userService = new UserService(User);

const token = process.env.TOKEN;

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds , 
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildPresences
  ]
});

client.commands = new Collection();
client.slashs = new Collection();
client.alias = new Collection();
client.t = i18n.t;
client.userService = userService;

require('../handlers/commands')(client);
require('../handlers/events')(client);
require('../handlers/slash')(client);

client.login(token);


