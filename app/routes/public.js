const express = require('express');
const router = express.Router();
const controller = require('../controllers/public');

// Log repondant
router.post('/login', controller.login)

// Submit form
router.post('/submit/:id', controller.submit)

module.exports = router;