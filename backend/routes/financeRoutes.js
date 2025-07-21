const express = require('express');
const { getStockData, getMarketOverview } = require('../controllers/financeController');

const router = express.Router();

router.get('/', getStockData);
router.get('/overview', getMarketOverview);

module.exports = router;