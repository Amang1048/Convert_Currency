const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 7850;

// Middleware to parse JSON requests
app.use(express.json());

// Define your API routes
app.post('/convert', async (req, res) => {
  try {
    const { amount, fromCurrency, toCurrency } = req.body;

    // Fetch exchange rates from a free API (replace with your API key)
    const response = await axios.get(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/{currencyA}/{currencyB}.json`
    );
    const rates = response.data.rates;

    // Check if the currencies are valid
    if (!rates[fromCurrency] || !rates[toCurrency]) {
      return res.status(400).json({ error: 'Invalid currency code' });
    }

    // Perform the conversion
    const convertedAmount = (amount * rates[toCurrency]) / rates[fromCurrency];

    res.json({ result: convertedAmount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
