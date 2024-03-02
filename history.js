import React, { useState, useEffect } from 'react';
import './history.css'; 

function MainWeather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = 'YOUR_API_KEY_HERE'; // قم بتغييره إلى مفتاح API الخاص بك

  useEffect(() => {
    if (city.trim() === '') return;
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

    const fetchWeatherData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWeatherData();
  }, [city, API_KEY]); // يجب وضع API_KEY هنا لتحديث البيانات عندما يتغير

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="weather-container">
      <h2 className="weather-title">7-Day Weather Forecast</h2>
      <div className="city-input">
        <input
          type="text"
          value={city}
          onChange={handleInputChange}
          placeholder="Enter city name"
          className="city-input-field"
        />
      </div>
      {weatherData && weatherData.list.slice(0, 7).map((item, index) => (
        <div key={index} className="weather-item">
          <p className="weather-info date"><span>Date:</span> {item.dt_txt}</p>
          <p className="weather-info temperature"><span>Temperature:</span> {item.main.temp}°C</p>
          <p className="weather-info description"><span>Weather:</span> {item.weather[0].description}</p>
        </div>
      ))}
    </div>
  );
}

export default MainWeather;
