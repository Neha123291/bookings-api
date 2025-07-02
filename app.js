const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
connectDB();

app.use(express.json());

// Sample route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
