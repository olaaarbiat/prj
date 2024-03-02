const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const NodeCache = require('node-cache');
const bodyParser = require('body-parser');
const authRoutes = require('./server/routes/authRoutes');
const authController = require('./server/controllers/authController');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 3001;

// اتصال بقاعدة بيانات MongoDB
const connection = "mongodb+srv://ola:olaali910@cluster0.4bgkjef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(connection, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
  try {
    await client.connect();
    console.log('تم الاتصال بقاعدة بيانات MongoDB');
  } catch (err) {
    console.error('فشل الاتصال بقاعدة بيانات MongoDB', err);
  }
}

run().catch(console.dir);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);

// تكوين الذاكرة المؤقتة
const cache = new NodeCache();
const weatherAPIKey = 'YOUR_WEATHER_API_KEY'; // استبدل هنا بمفتاح الواجهة البرمجية لطقس مفتوح

app.get('/weather', async (req, res) => {
  try {
    const cachedData = cache.get('weatherData');
    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=London&appid=${weatherAPIKey}`);
    cache.set('weatherData', response.data, 60); // الحفاظ على البيانات في الذاكرة المؤقتة لمدة 60 ثانية
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'فشل في جلب بيانات الطقس' });
  }
});

app.listen(port, () => {
  console.log(`الخادم يعمل على المنفذ ${port}`);
});

module.exports = app;
