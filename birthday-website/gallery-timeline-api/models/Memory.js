const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  birthdayId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Birthday', // Reference to the Birthday model
    required: true,
  },
  title: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ['Our Memories', 'Special Moments', 'Celebrations'],
    required: true,
  },
  img: { type: String, required: true }, // Single image path
}, { timestamps: true });

module.exports = mongoose.model('Memory', memorySchema);
