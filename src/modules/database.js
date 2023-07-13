const mongoose = require('mongoose');
require('dotenv').config();

const cluster = process.env.CLUSTER;

const database = mongoose.connect(cluster, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao banco de dados MongoDB.');
}).catch((error) => {
  console.error('Erro ao conectar ao banco de dados MongoDB:', error);
});

module.export = { database };