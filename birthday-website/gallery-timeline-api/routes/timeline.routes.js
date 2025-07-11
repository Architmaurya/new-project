const express = require('express');
const router = express.Router();
const timelineController = require('../controllers/timeline.controller');
const upload = require('../middlewares/multer'); // multer middleware

// POST /api/timeline/create — handle multiple timeline entries + files
router.post('/timelinecreate', upload.array('image'), timelineController.createTimelines);

router.get('/:birthdayId', timelineController.getTimelinesByBirthdayId);


module.exports = router;
