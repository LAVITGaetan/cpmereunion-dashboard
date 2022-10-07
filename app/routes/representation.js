const express = require('express');
const router = express.Router();
const controller = require('../controllers/representation');


// Add representation
router.post('/add/:ressource', controller.addRepresentation)

// Edit representation
router.post('/edit/:id/:ressource', controller.editRepresentation)

// Delete representation
router.get('/delete/:id/:ressource', controller.deleteRepresentation)

module.exports = router;