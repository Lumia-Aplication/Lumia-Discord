const { Client, GatewayIntentBits, Collection, Events } = require('discord.js');
require('dotenv').config();

const { database } = require('./database');

require('./alias');

const token = process.env.TOKEN;
const prefix = '.';

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

require('../handlers/commands')(client);
require('../handlers/events')(client);

client.login(token);


