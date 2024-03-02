require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.API_KEY;

const getWeather = async (req, res) => {
  const { location } = req.query;

  try {
    const response = await axios.get(`https://api.example.com/weather?location=${location}&apikey=${API_KEY}`);
    const weatherData = response.data;

    // استخدام مفتاح API في الطلب الخارجي
    // ...

    res.json({/* بيانات الطقس */});
  } catch (error) {
    console.error('فشل في جلب بيانات الطقس:', error);
    res.status(500).json({ message: 'فشل في جلب بيانات الطقس' });
  }
};

module.exports = {
  getWeather
};
