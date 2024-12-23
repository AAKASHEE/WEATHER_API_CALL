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
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Weather App</h1>
        <SearchBar onSearch={handleSearch} />
        {error && (
          <p className="text-red-500 text-center mb-4">{error}</p>
        )}
        {weather && <WeatherDisplay weather={weather} />}
      </div>
    </div>
  );
}

export default App;