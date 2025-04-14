const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors()); // 🛡️ Allow requests from any origin

const API_KEY = '2b1f9436-1cba-449d-baca-af62713ec816'; // Replace with your actual key

app.get('/api/live-scores', async (req, res) => {
  try {
    const response = await fetch('https://api.balldontlie.io/v1/box_scores/live', {
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from API:', error);
    res.status(500).json({ error: 'Failed to fetch data from BallDontLie API' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running at http://localhost:${port}`);
});
