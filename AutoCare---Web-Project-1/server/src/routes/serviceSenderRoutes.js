const express = require('express');
const router = express.Router();
const serviceSenderController = require('../controllers/serviceSenderController.js');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/:id', upload.single("profilePicture"), (req, res, next) => {

    if (req.fileValidationError) {
        return res.status(400).json({ error: req.fileValidationError });
    } else if (!req.file) {
        return res.status(400).json({ error: 'File not provided' });
    }
    next();
}, authMiddleware, serviceSenderController.updateServiceSender);

router.post('/', serviceSenderController.createServiceSender)
router.post('/grant/:id', serviceSenderController.grantServiceSender)
router.get('/', authMiddleware, serviceSenderController.getServiceSender);
router.get('/user', serviceSenderController.getServiceSender);
router.put('/:id', authMiddleware, serviceSenderController.updateServiceSender);
router.delete('/:id', authMiddleware, serviceSenderController.deleteServiceSender);

module.exports = router;
