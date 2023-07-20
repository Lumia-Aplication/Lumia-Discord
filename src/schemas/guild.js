const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true },
  prefix: { type: String, default: '.' },
  usages: { type: Number, default: 0},
  lastReset: {type: Date, default: Date.now() }
});

const Guild = mongoose.model('Guild', guildSchema);

module.exports = Guild;