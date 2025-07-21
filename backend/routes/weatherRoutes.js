const express = require('express');
const { getWeatherData, getCurrentWeather } = require('../controllers/weatherController');

const router = express.Router();

router.get('/', getWeatherData);
router.get('/current', getCurrentWeather);

module.exports = router;