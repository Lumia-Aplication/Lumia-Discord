const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();


const i18n = require('./i18n');
require('./database');
require('./alias');

const User = require('../schemas/user');
const Guild = require('../schemas/guild');
const loadHandlers = require('../_partials');

const UserService = require('../models');
const userService = new UserService(User);
const GuildService = require('../models');
const guildService = new GuildService(Guild);

const token = process.env.TOKEN;

const client = new Client({ 
  intents: [
    GatewayIntentBits.Guilds, 
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
client.guildService = guildService;
loadHandlers(client);


client.login(token);
