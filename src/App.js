import React, { useState } from 'react';
import keys from './keys';
import './App.css';

const api = {
  key: keys.API_KEY,
  base: keys.BASE_URL
};

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);

  const search = async (e) => {
    if (e.key === 'Enter' && query) {
      try {
        const res = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`);
        const data = await res.json();
        setWeather(data.cod === '404' ? null : data);  // ถ้าไม่พบข้อมูลจะตั้งค่าเป็น null
        setQuery('');  // รีเซ็ตค่า query
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  };

  return (
    <div className={weather && weather.main ? (weather.main.temp > 18 ? "App hot" : "App cold") : "App"}>
      <main>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            className="search-bar"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={search}
          />
        </div>

        {weather && (
          <>
            <div className="location-container">
              <div className="location">
                {weather.name}, {weather.sys.country || 'Unknown'}
              </div>
              <div className="date">{new Date().toDateString()}</div>  {/* แสดงวันที่ */}
            </div>
            <div className="weather-container">
              <div className="temperature">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0]?.main}</div>
              <div className="weather-des">
                {weather.weather[0]?.description && `(${weather.weather[0]?.description})`}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
