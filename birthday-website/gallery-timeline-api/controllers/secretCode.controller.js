const SecretCode = require('../models/secretCode.model');

// POST: Add a new secret message
exports.createSecretCode = async (req, res) => {
  try {
    const { code, message, birthdayId } = req.body;

    if (!code || !message || !birthdayId) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Optional: Verify secret code before saving
    if (code.trim().toLowerCase() !== 'loveyou') {
      return res.status(401).json({ error: 'Invalid secret code.' });
    }

    const newSecret = new SecretCode({ code, message, birthdayId });
    const saved = await newSecret.save();

    res.status(201).json({ message: 'Secret saved successfully!', data: saved });
  } catch (error) {
    console.error('Error saving secret code:', error);
    res.status(500).json({ error: 'Server error while saving secret message.' });
  }
};


exports.checkSecretCode = async (req, res) => {
  try {
    const { code, birthdayId } = req.body;

    if (!code || !birthdayId) {
      return res.status(400).json({ error: 'Code and birthdayId are required.' });
    }

    const secret = await SecretCode.findOne({
      code: code.trim().toLowerCase(),
      birthdayId,
    });

    if (!secret) {
      return res.status(404).json({ error: 'Secret message not found 💔' });
    }

    res.status(200).json({ message: secret.message });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while validating secret code.' });
  }
};



