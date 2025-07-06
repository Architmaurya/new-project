const express = require('express');
const router = express.Router();
const birthdayController = require('../controllers/birthdayController');

// Create birthday
router.post('/', birthdayController.createBirthday);      // POST /api/birthday
router.get('/:id', birthdayController.getBirthdayById);   // GET  /api/birthday/:id ✅

module.exports = router;
