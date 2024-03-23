const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const bookingController = require('../controllers/bookingController');

router.post('/',authMiddleware, bookingController.createBooking);
router.post('/center',authMiddleware, bookingController.getBooking);
router.get('/user/:id',authMiddleware, bookingController.getBookingUser);
router.delete('/:id',authMiddleware, bookingController.finishbooking);

module.exports = router;

