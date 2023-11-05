const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  message: String,
  
});

module.exports = mongoose.model('Log', logSchema);
