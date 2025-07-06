const Memory = require('../models/Memory');
const Birthday = require('../models/Birthday');
const cloudinary = require('../config/cloudinary');

exports.createMemories = async (req, res) => {
  try {
    const { birthdayId } = req.body;
    const files = req.files; // multer parses these
    const memories = JSON.parse(req.body.memories);

    if (!birthdayId || !files || !Array.isArray(memories)) {
      return res.status(400).json({ message: 'Missing required data' });
    }

    const birthday = await Birthday.findById(birthdayId);
    if (!birthday) return res.status(404).json({ message: 'Birthday not found' });

    const uploadedMemories = await Promise.all(
      memories.map(async (memory, index) => {
        const file = files[index];
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'memories',
        });

        return await Memory.create({
          title: memory.title,
          category: memory.category,
          img: result.secure_url,
          birthday: birthdayId,
        });
      })
    );

    res.status(201).json({ success: true, memories: uploadedMemories });
  } catch (error) {
    console.error('Memory Upload Error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
