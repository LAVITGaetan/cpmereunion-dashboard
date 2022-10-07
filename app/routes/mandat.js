const express = require('express');
const router = express.Router();
const controller = require('../controllers/mandat');

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

// Add mandat
router.post('/add', upload.single('mandatLogo'), controller.addMandat)

// Edit mandat
router.post('/edit/:id', upload.single('mandatLogo'), controller.editMandat)

// Delete mandat
router.get('/delete/:id', controller.deleteMandat)

module.exports = router;