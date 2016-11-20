const mongoose = require('mongoose');
const Pin = require('./pin.js');

const boardsSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  user: { type: mongoose.Schema.ObjectId, ref: 'User'},
  pins: [Pin.schema]
});

module.exports = mongoose.model('Board', boardsSchema);
