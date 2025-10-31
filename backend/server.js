const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const path = require('path');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Proper CORS configuration
const allowedOrigins = [
  'http://localhost:5173',                  // local dev
  'https://rex-frontend-pf7l.onrender.com', // old frontend (optional)
  'https://rex-frontend.onrender.com'       // new deployed frontend
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('❌ Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true,
}));

// Middleware
app.use(express.json());

// ✅ Serve uploads folder statically with CORS headers
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api', userRouter);
app.use('/api/resume', resumeRoutes);

// Optional: test route for API working
app.get('/api', (req, res) => {
  res.send('API is working');
});

// Serve frontend in production (if you have a build folder)
const __dirname1 = path.resolve();
app.use(express.static(path.join(__dirname1, 'frontend', 'dist')));
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});





// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
