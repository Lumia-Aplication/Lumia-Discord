import { getInfo } from 'discord-hybrid-sharding';
import { GatewayIntentBits } from 'discord.js';
import { LumiaManager } from "./managers/LumiaManager.js";

const clusterInfo = getInfo();

const client = new LumiaManager({
  shards: clusterInfo.SHARD_LIST,
  shardCount: clusterInfo.TOTAL_SHARDS,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.load()