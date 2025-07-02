const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Import the route
const bookingRoutes = require('./routes/bookings');
app.use('/bookings', bookingRoutes); 

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/test', (req, res) => {
  res.send('Test route works!');
});

// Start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
