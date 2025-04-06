const express = require('express');
const fetch = require('node-fetch'); // still needed for Node v14–17 or older

const app = express();
const port = 3000;

// ✅ Replace this with your actual API key
const API_KEY = '2b1f9436-1cba-449d-baca-af62713ec816';

app.get('/api/live-scores', async (req, res) => {
  try {
    const response = await fetch('https://api.balldontlie.io/v1/box_scores/live', {
      headers: {
        Authorization: `Bearer ${API_KEY}`, // ✅ Send API key correctly
      }
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Error from BallDontLie API:', errorMessage);
      return res.status(response.status).json({ error: errorMessage });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching or parsing:', error);
    res.status(500).json({ error: 'Error fetching data from API.' });
  }
});

app.listen(port, () => {
  console.log(`✅ Proxy server running at http://localhost:${port}`);
});


