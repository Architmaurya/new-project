// controllers/memoryController.js
const Memory = require('../models/Memory');
const cloudinary = require('../config/cloudinary');
const fs = require('fs'); // For deleting temporary local files

exports.createMemories = async (req, res) => {
  try {
    console.log('--- Request received at createMemories ---'); // IMPORTANT
    
    const { memoriesData } = req.body; // This should be a JSON string of an array of memory objects
    const uploadedFiles = req.files; // This will be an array of files uploaded by multer
    
    console.log('Request Body:', memoriesData); // Check if memoriesData is here
    console.log('Uploaded Files:', uploadedFiles); // Check if files are here
    if (!memoriesData || uploadedFiles.length === 0) {
      return res.status(400).json({ success: false, message: 'No memories data or images provided.' });
    }

    let parsedMemories;
    try {
      parsedMemories = JSON.parse(memoriesData);
      if (!Array.isArray(parsedMemories)) {
        return res.status(400).json({ success: false, message: 'memoriesData must be an array of memory objects.' });
      }
    } catch (jsonError) {
      return res.status(400).json({ success: false, message: 'Invalid JSON format for memoriesData.' });
    }

    const createdMemories = [];
    const uploadPromises = [];

    // Loop through each memory object received from the frontend
    for (let i = 0; i < parsedMemories.length; i++) {
      const memory = parsedMemories[i];
      const correspondingFile = uploadedFiles[i]; // Assuming order matches

      if (!correspondingFile) {
        // Handle case where a memory object doesn't have a corresponding file
        console.warn(`Memory object at index ${i} has no corresponding file.`);
        continue; // Skip this memory or handle error as appropriate
      }

      // 1. Validate incoming data for each memory
      if (!memory.birthdayId || !memory.title || !memory.category) {
        return res.status(400).json({ success: false, message: `Missing required fields for memory at index ${i}.` });
      }

      // 2. Upload each image to Cloudinary
      uploadPromises.push(
        cloudinary.uploader.upload(correspondingFile.path, {
          folder: 'memories_single', // Optional: Specific folder for single images
        }).then(result => {
          // Associate the Cloudinary URL with the memory data
          const newMemory = new Memory({
            birthdayId: memory.birthdayId,
            title: memory.title,
            category: memory.category,
            img: result.secure_url, // Single image URL
          });
          return newMemory.save();
        })
      );
    }

    const savedMemories = await Promise.all(uploadPromises);
    createdMemories.push(...savedMemories);

    // 3. Clean up local files (important!)
    uploadedFiles.forEach(file => {
      fs.unlink(file.path, (err) => {
        if (err) console.error('Error deleting local file:', err);
      });
    });

    res.status(201).json({
      success: true,
      message: `${createdMemories.length} memories created successfully!`,
      memories: createdMemories,
    });

  } catch (error) {
    console.error('Error creating memories:', error);
    // Ensure local files are cleaned up even if an error occurs
    if (req.files) {
      req.files.forEach(file => {
        fs.unlink(file.path, (err) => {
          if (err) console.error('Error deleting local file after error:', err);
        });
      });
    }
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};



exports.getMemories = async (req, res) => {
  try {
    const { birthdayId } = req.params;

    if (!birthdayId) {
      return res.status(400).json({ success: false, message: 'birthdayId is required in params.' });
    }

    const memories = await Memory.find({ birthdayId });

    res.status(200).json({
      success: true,
      message: `Found ${memories.length} memories for birthdayId: ${birthdayId}`,
      memories,
    });
  } catch (error) {
    console.error('Error fetching memories:', error);
    res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

