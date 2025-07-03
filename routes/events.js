const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// Create event (only for organizer or admin)
router.post('/', auth, async (req, res) => {
  try {
    // Only allow organizer or admin
    if (!['organizer', 'admin'].includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Only organizers or admins can create events.' });
    }
    const { title, date, location, seatsAvailable } = req.body;
    const event = new Event({ title, date, location, seatsAvailable });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 