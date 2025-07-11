const Timeline = require('../models/Timeline');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.createTimelines = async (req, res) => {
  try {
    console.log('📩 Received request to create timeline events');

    const { timelinesData } = req.body; // Expecting a JSON string of timeline events
    const uploadedFiles = req.files;    // Multer handles uploaded files

    if (!timelinesData || uploadedFiles.length === 0) {
      return res.status(400).json({ success: false, message: 'No timeline data or files uploaded.' });
    }

    let parsedTimelines;
    try {
      parsedTimelines = JSON.parse(timelinesData);
      if (!Array.isArray(parsedTimelines)) {
        return res.status(400).json({ success: false, message: 'timelinesData must be an array.' });
      }
    } catch (err) {
      return res.status(400).json({ success: false, message: 'Invalid JSON for timelinesData.' });
    }

    const uploadPromises = [];

    for (let i = 0; i < parsedTimelines.length; i++) {
      const timeline = parsedTimelines[i];
      const file = uploadedFiles[i]; // Assuming 1-to-1 mapping

      // Validation
      if (!timeline.birthdayId || !timeline.date || !timeline.title || !timeline.description || !timeline.location) {
        return res.status(400).json({ success: false, message: `Missing required fields in timeline at index ${i}` });
      }

      let imageUrl = '';
      if (file) {
        const uploadResult = await cloudinary.uploader.upload(file.path, {
          folder: 'timelines',
        });
        imageUrl = uploadResult.secure_url;
      }

      const newTimeline = new Timeline({
        birthdayId: timeline.birthdayId,
        date: timeline.date,
        location: timeline.location,
        title: timeline.title,
        description: timeline.description,
        image: imageUrl,
        icon: timeline.icon || '💖',
      });

      uploadPromises.push(newTimeline.save());
    }

    const savedTimelines = await Promise.all(uploadPromises);

    // Clean up temp files
    uploadedFiles.forEach(file => {
      fs.unlink(file.path, (err) => {
        if (err) console.error('Error deleting local file:', err);
      });
    });

    res.status(201).json({
      success: true,
      message: `${savedTimelines.length} timeline events saved successfully!`,
      timelines: savedTimelines,
    });

  } catch (error) {
    console.error('❌ Error creating timelines:', error);

    if (req.files) {
      req.files.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Error deleting local file after failure:', err);
        });
      });
    }

    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};



exports.getTimelinesByBirthdayId = async (req, res) => {
  try {
    const { birthdayId } = req.params;

    if (!birthdayId) {
      return res.status(400).json({ success: false, message: 'birthdayId is required.' });
    }

    const timelines = await Timeline.find({ birthdayId }).sort({ date: 1 });

    res.status(200).json({
      success: true,
      message: `Found ${timelines.length} timeline events.`,
      timelines,
    });
  } catch (error) {
    console.error('Error fetching timelines:', error);
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};