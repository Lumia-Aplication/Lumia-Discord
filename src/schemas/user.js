const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  lang: { type: String, default: 'br' }, 
});

const User = mongoose.model('User', userSchema);

module.exports = User;