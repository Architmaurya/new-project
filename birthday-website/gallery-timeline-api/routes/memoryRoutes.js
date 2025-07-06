const express = require('express');
const router = express.Router();
const { createMemories } = require('../controllers/memoryController');
const upload = require('../middlewares/multer');

// POST /api/memory
// Accepts multiple image uploads + memory data (JSON in text field)
router.post('/memories', upload.array('images'), createMemories);

module.exports = router;
