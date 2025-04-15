const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Your API Key (use as a Bearer token)
const API_KEY = '2b1f9436-1cba-449d-baca-af62713ec816';

// Enable CORS to allow the frontend to access the backend
app.use(cors());

// NBA Games Endpoint Proxy
app.get('/api/nba-games', async (req, res) => {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const url = `https://api.balldontlie.io/v1/games?dates[]=${today}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}` // Use 'Bearer' prefix for the API key
      }
    });
    res.json(response.data); // Send data back to the frontend
  } catch (error) {
    console.error('NBA API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch NBA games' });
  }
});

// MLB Games Endpoint Proxy
app.get('/api/mlb-games', async (req, res) => {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  const url = `https://api.balldontlie.io/mlb/v1/games?dates[]=${today}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${API_KEY}` // Use 'Bearer' prefix for the API key
      }
    });
    res.json(response.data); // Send data back to the frontend
  } catch (error) {
    console.error('MLB API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch MLB games' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server is running at http://localhost:${PORT}`);
});


