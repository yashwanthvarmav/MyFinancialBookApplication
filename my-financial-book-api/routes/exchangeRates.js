const { getExchangeRates } = require('../services/exchangeRateService');

async function listExchangeRates(req, res) {
    try {
        const baseCurrency = req.query.baseCurrency;
        const rates = await getExchangeRates(baseCurrency);
        res.send(rates);
      } catch (error) {
        res.statusCode = 500;
        res.send({
            error: 'Failed to fetch exchange rates'
        })
      }
    
}

module.exports = {
    listExchangeRates
}