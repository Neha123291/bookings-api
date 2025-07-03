const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('../middleware/auth'); 

// Create booking
router.post('/', async (req, res) => {
  const { eventId, seatNumber } = req.body;
  try {
    const booking = await Booking.create({
      eventId,
      seatNumber,
      // userId: "64c1e19a203aca73b4de4d4e"
      userId: req.user.id

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

// GET /bookings/:bookingId
router.get('/:bookingId', async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /bookings/:bookingId
router.delete('/:bookingId', async (req, res) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Protect routes with auth middleware
router.post('/', auth, async (req, res) => {
  const { eventId, seatNumber } = req.body;
  try {
    const booking = await Booking.create({
      eventId,
      seatNumber,
      userId: req.user.id 
    });
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
