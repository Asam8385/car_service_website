const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/', upload.single("offer_image"), (req, res, next) => {

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: 'File not provided' });
    }
    next();
}, authMiddleware, offerController.AddOffer);

router.post('/center', authMiddleware, offerController.getOffer);
router.delete('/:id', authMiddleware, offerController.finishoffer);

module.exports = router;
