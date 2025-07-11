const express = require('express');
const router = express.Router();
const { checkSecretCode,getSecretMessage,createSecretCode } = require('../controllers/secretCode.controller');

router.post('/secret', createSecretCode);

// router.get('/getcode', getSecretMessage);

router.post('/secret-code/check', checkSecretCode); 

module.exports = router;
