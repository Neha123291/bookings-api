const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth');

// POST /bookings
router.post('/', auth, async (req, res) => {
  const { eventId, seatNumber } = req.body;
  try {
    const booking = await Booking.create({
      userId: req.user.id,
      eventId,
      seatNumber
    });
    res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /bookings
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
