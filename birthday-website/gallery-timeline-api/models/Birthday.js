const mongoose = require('mongoose');

const birthdaySchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  message: { type: String, required: true },
  happyText: { type: String, default: 'Happy' },
  birthdayText: { type: String, default: 'Birthday' },
}, { timestamps: true });

module.exports = mongoose.model('Birthday', birthdaySchema);
