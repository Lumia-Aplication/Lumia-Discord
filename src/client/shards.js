const { ShardingManager } = require('discord.js');
require('dotenv').config();

const token = process.env.TOKEN;
const manager = new ShardingManager('./src/client/index.js', {
  token: token,
});
      
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
      
manager.spawn().catch(() => {});