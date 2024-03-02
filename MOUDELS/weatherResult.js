const mongoose = require('mongoose');

const weatherResultSchema = new mongoose.Schema({
  location: { type: String, required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number },
  windSpeed: { type: Number },
  pressure: { type: Number },
  description: { type: String }
}, { timestamps: true }); // إضافة timestamps لتسجيل الوقت الذي تم فيه حفظ النتيجة

const WeatherResult = mongoose.model('WeatherResult', weatherResultSchema);

module.exports = WeatherResult;
