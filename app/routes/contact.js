const express = require('express');
const router = express.Router();
const controller = require('../controllers/contact');


// Add contact
router.post('/add', controller.addContact)

// Edit contact
router.post('/edit/:id', controller.editContact)

// Delete contact
router.get('/delete/:id/:id_adherent', controller.deleteContact)

module.exports = router;