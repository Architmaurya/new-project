const express = require("express");
const router = express.Router();
const { createMemories } = require("../controllers/memoryController");
// const upload = require('../middlewares/multer');

const multer = require("multer");
// Configure multer for memory storage (temporary storage before Cloudinary upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store uploaded files in an 'uploads' directory
  },
  filename: (req, file, cb) => {
    // It's crucial here that the order of files sent by the frontend is consistent
    // with the order of data in the 'memoriesData' JSON string.
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// POST /api/memory
// Accepts multiple image uploads + memory data (JSON in text field)
router.post(
  "/memories",
  (req, res, next) => {
    console.log("--- Request hitting /api/memories route ---"); // IMPORTANT
    next(); // Pass control to multer middleware
  },
  upload.array("images"),
  createMemories
);

module.exports = router;
