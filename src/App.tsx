import React, { useState } from 'react';

import { SearchBar } from './components/SearchBar';
import { WeatherDisplay } from './components/WeatherDisplay';
import { getWeather } from './services/weatherApi';
import { WeatherData } from './types/weather';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');

  const handleSearch = async (city: string) => {
    try {
      setError('');
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError('City not found or error fetching weather data');
      setWeather(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-800 py-12 px-4 text-white">
      <div className="max-w-lg mx-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center mb-6 drop-shadow-lg">
          ☀️ Weather App 🌦️
        </h1>
        <SearchBar onSearch={handleSearch} />
        {error && (
          <p className="text-red-300 text-center font-medium mt-4">{error}</p>
        )}
        {weather && <WeatherDisplay weather={weather} />}
      </div>
    </div>
  );
}

export default App;
