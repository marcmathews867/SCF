const fetch = require('node-fetch'); // Importing fetch

// Set up Express
const express = require('express');
const app = express();
const port = 3000;

// Your BallDon'tLie API key (replace with your actual key)
const API_KEY = 'YOUR_API_KEY'; // Ensure you replace this with your actual API key

// Route to get games data for a specific date
app.get('/games', async (req, res) => {
  const date = req.query.date; // Get date from query parameter
  
  if (!date) {
    return res.status(400).json({ error: 'Date query parameter is required.' });
  }

  try {
    console.log(`Fetching data for date: ${date}`);
    
    // Making the fetch request to BallDon'tLie API
    const response = await fetch(`https://www.balldontlie.io/api/v1/games?dates[]=${date}`, {
      headers: {
        Authorization: `Bearer ${API_KEY}` // Add authorization header with your API key
      }
    });
    
    // Check if the response is okay (status code 200)
    if (!response.ok) {
      const errorMessage = await response.text(); // Get the error message from the response
      console.log('Error Response:', errorMessage); // Log the error
      return res.status(response.status).json({ error: errorMessage });
    }

    const data = await response.json(); // Parse the response to JSON
    console.log('Fetched Data:', data); // Log the data received from the API
    res.json(data); // Send the data to the client

  } catch (error) {
    console.error('Error fetching or parsing:', error); // Log any errors that occur
    res.status(500).json({ error: 'Error fetching data from API.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
