import { ClusterManager } from "discord-hybrid-sharding";

const manager = new ClusterManager('./package/bot/Laucher.js', {
  token: process.env.TOKEN,
  totalShards: 3,
  totalClusters: 1,
  mode: 'process',
})

manager.on('clusterCreate', (cluster) =>
  console.log(`Launched Cluster ${cluster.id}`)
);

manager.spawn({timeout: -1});