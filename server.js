require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  // origin: '*',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization']
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

// Add this before your routes
app.options('*', cors(corsOptions));  // Enable preflight for all routes

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/rides', require('./routes/rides'));

console.log('Using FRONTEND_URL:', process.env.FRONTEND_URL);

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
