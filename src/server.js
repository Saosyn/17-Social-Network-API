// server.js
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes/api');

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API Routes
app.use('/api', routes);

// Start server when DB is connected
db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
