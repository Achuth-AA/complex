const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const { authenticateToken } = require('./middleware/auth');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// Protected routes example
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ success: true, message: 'You accessed a protected route!', user: req.user });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));