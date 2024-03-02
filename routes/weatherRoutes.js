const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

// تحديد مسارات الطقس
router.get('/', weatherController.getWeather);

module.exports = router;
