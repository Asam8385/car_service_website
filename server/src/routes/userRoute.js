const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Signup route
router.post('/signup', userController.signup);

module.exports = router;
