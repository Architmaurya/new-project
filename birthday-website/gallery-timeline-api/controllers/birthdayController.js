const Birthday = require('../models/Birthday');

// POST /api/birthday
exports.createBirthday = async (req, res) => {
  try {
    const { nickname, message, happyText, birthdayText } = req.body;

    const newWish = new Birthday({
      nickname,
      message,
      happyText,
      birthdayText,
    });

    await newWish.save();
    res.status(201).json({ success: true, _id: newWish._id, data: newWish });
  } catch (err) {
    console.error('Create Birthday Error:', err);
    res.status(500).json({ success: false, message: 'Something went wrong.' });
  }
};

// GET /api/birthday/:id
exports.getBirthdayById = async (req, res) => {
  try {
    const { id } = req.params;

    const birthday = await Birthday.findById(id);
    if (!birthday) {
      return res.status(404).json({ success: false, message: 'Birthday not found' });
    }

    res.status(200).json({ success: true, data: birthday });
  } catch (err) {
    console.error('Birthday Fetch Error:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
