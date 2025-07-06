const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema(
  {
    birthdayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Birthday', // This should match your Birthday model name
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    icon: {
      type: String,
      default: '💖',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Timeline', timelineSchema);
