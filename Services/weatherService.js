const axios = require('axios');

// Fetch weather data from external API
const fetchWeatherData = async () => {
  try {
    // Implement logic to fetch weather data from external API
    const response = await axios.get('weather_api_url');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch weather data');
  }
};

module.exports = { fetchWeatherData };
