const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  prefix: { type: String, default: '.' }, 
});

const Guild = mongoose.model('Guild', guildSchema);

module.exports = Guild;