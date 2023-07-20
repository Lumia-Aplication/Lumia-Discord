const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

require('../modules/database');
require('../modules/alias');
const configureAtributes = require('./atributes');
const loadHandlers = require('../_partials');

const token = process.env.TOKEN;
const intents = [
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
];

const client = new Client({ intents });

loadHandlers(client);
configureAtributes(client);

client.login(token);
