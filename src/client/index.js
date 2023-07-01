const { Client, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();

const { database } = require('./database');
require('./alias');
const i18n = require('./i18n');

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
client.alias = new Collection();
client.database = database;
client.t = i18n.t;

require('../handlers/commands')(client);
require('../handlers/events')(client);

client.login(token);


