const mongoose = require('mongoose');

const pinsSchema = new mongoose.Schema({
  type: { type: String, required: true, trim: true, default: 'image' },
  source: { type: String, required: true, trim: true },
  likes: [{ type: mongoose.Schema.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Pin', pinsSchema);
