const express = require('express');
const { getLatestNews, getNewsByKeyword } = require('../controllers/newsController');

const router = express.Router();

router.get('/', getLatestNews);
router.get('/search', getNewsByKeyword);

module.exports = router;