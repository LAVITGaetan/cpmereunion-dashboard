const express = require('express');
const router = express.Router();
const controller = require('../controllers/sondage');


// Add sondage
router.post('/add', controller.addSondage)

// Edit sondage
router.post('/edit/:id', controller.editSondage)

// Delete sondage
router.get('/delete/:id', controller.deleteSondage)

// Edit sondage parution
router.get('/parution/:id/:boolean', controller.editParution)

module.exports = router;