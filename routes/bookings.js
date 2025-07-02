const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
// const auth = require('../middleware/auth'); 

// Create booking
router.post('/', async (req, res) => {
  const { eventId, seatNumber } = req.body;
  try {
    const booking = await Booking.create({
      eventId,
      seatNumber,
      userId: "64c1e19a203aca73b4de4d4e"
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
