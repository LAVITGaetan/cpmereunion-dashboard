const express = require('express');
const router = express.Router();
const controller = require('../controllers/mandataire');

// MULTER Settings
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `logo_${req.body.nom}_${req.body.prenom}_${file.originalname}`)
    }
})
const fileFilter = function (req, file, cb) {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    }
    else {
        cb(null, false)
    }
}
const upload = multer({
    storage: storage, limits: {
        fileSize: 1024 * 1024 * 5,
    },
    fileFilter: fileFilter
});

// Add mandataire
router.post('/add', upload.single('mandataireLogo'), controller.addMandataire)

// Edit mandataire
router.post('/edit/:id', upload.single('mandataireLogo'), controller.editMandataire)

// Delete mandataire
router.get('/delete/:id', controller.deleteMandataire)

module.exports = router;