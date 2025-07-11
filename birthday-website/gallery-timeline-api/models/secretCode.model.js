const mongoose = require('mongoose');

const secretCodeSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
     birthdayId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Birthday', // This should match your Birthday model name
          required: true,
        },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SecretCode', secretCodeSchema);
