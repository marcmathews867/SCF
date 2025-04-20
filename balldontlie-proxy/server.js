const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Your API Key (without 'Bearer')
const API_KEY = '2b1f9436-1cba-449d-baca-af62713ec816';

// Enable CORS to allow the frontend to access the backend
app.use(cors());

// NBA Games Endpoint Proxy
app.get('/api/nba-games', async (req, res) => {
  const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
  console.log('Date used for API call:', today);
  const url = `https://api.balldontlie.io/v1/games?dates[]=${today}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': API_KEY // ✅ Corrected: No 'Bearer' prefix
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
  console.log('Date used for API call:', today);
  const url = `https://api.balldontlie.io/mlb/v1/games?dates[]=${today}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': API_KEY // ✅ Corrected: No 'Bearer' prefix
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



// Featured Player Info Proxy
app.get('/api/player/:id', async (req, res) => {
  const playerId = req.params.id;
  const url = `https://api.balldontlie.io/v1/players/${playerId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': "2b1f9436-1cba-449d-baca-af62713ec816"
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Player API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch player info' });
  }
});


// Team Info Endpoint Proxy
app.get('/api/team/:id', async (req, res) => {
  const teamId = req.params.id;
  const url = `https://api.balldontlie.io/v1/teams/${teamId}`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': "2b1f9436-1cba-449d-baca-af62713ec816"
      }
    });
    res.json(response.data); // Send data back to the frontend
  } catch (error) {
    console.error('Team API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({ error: 'Failed to fetch team info' });
  }
});





