const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const formController = require('../controllers/formController');

router.post('/',authMiddleware, formController.createform);
router.get('/',authMiddleware, formController.getform);
router.delete('/:id',authMiddleware, formController.finishform);

module.exports = router;