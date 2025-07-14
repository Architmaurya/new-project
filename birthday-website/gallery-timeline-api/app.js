require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// ✅ Allow all origins
app.use(cors()); // ⬅️ This line enables CORS for everyone

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
const birthdayRoutes = require('./routes/birthdayRoutes');
const memoryRoutes = require('./routes/memoryRoutes');
const timelineRoutes = require('./routes/timeline.routes');
const secretCodeRoutes = require('./routes/secretCode.routes');

app.use('/api/birthday', birthdayRoutes);
app.use('/api/memory', memoryRoutes);
app.use('/api/timelime', timelineRoutes);
app.use('/api', secretCodeRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
