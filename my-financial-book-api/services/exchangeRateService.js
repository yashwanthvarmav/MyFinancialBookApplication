const axios = require('axios');

const apiKey = 'a96ce92307356d8719e0228a'; // Replace with your actual API key
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest`;

async function getExchangeRates(baseCurrency) {
  try {
    const response = await axios.get(`${apiUrl}/${baseCurrency}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw error;
  }
}

module.exports = {
  getExchangeRates,
};
