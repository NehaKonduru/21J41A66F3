const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Window size configuration
const WINDOW_SIZE = 10;

// Store for numbers
let numbers = [];

// Timeout for API requests
const TIMEOUT = 500;

// Test Server API endpoint
const TEST_SERVER_API = '(link unavailable)';

app.get('/numbers/:id', async (req, res) => {
  const id = (link unavailable);
  const qualifiedIds = ['p', 'f', 'e', 'r'];
  if (!qualifiedIds.includes(id)) {
    res.status(400).send({ error: 'Invalid ID' });
    return;
  }

  try {
    // Fetch numbers from third-party server
    const response = await axios.get(TEST_SERVER_API + id, {
      timeout: TIMEOUT,
    });

    // Store unique numbers, ignoring duplicates
    const newNumbers = response.data.filter((num) => !numbers.includes(num));
    numbers = [...new Set([...numbers, ...newNumbers])];

    // Limit stored numbers to window size
    if (numbers.length > WINDOW_SIZE) {
      numbers = numbers.slice(-WINDOW_SIZE);
    }

    // Calculate average
    const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;

    // Respond with numbers and average
    const windowPrevState = numbers.slice(0, -newNumbers.length);
    const windowCurrState = numbers;
    res.send({
      windowPrevState,
      windowCurrState,
      numbers: newNumbers,
      Tavg: avg.toFixed(2),
    });
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch numbers' });
  }
});

app.listen(port, () => {
  console.log(`Average Calculator microservice listening on port ${port}`);
});