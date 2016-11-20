const mongoose = require('mongoose');

const pinsSchema = new mongoose.Schema({
  type: { type: String, required: true, trim: true },
  source: { type: String, required: true, trim: true }
});

module.exports = mongoose.model('Pin', pinsSchema);
