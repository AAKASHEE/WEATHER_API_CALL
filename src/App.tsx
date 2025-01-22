import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, MapPin, History } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import { WeatherData } from './types';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  const API_KEY = '60483a06ce784f26cc9e9c200f8a5c22'; // Replace with your OpenWeatherMap API key

  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  const addToRecentSearches = (cityName: string) => {
    setRecentSearches(prev => {
      const filtered = prev.filter(c => c !== cityName);
      return [cityName, ...filtered].slice(0, 5);
    });
  };

  const fetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_KEY}&units=metric`
            );
            setWeather(response.data);
            addToRecentSearches(response.data.name);
            setError('');
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (err) {
            setError('Error fetching weather data.');
            setWeather(null);
          } finally {
            setLoading(false);
          }
        },
        () => {
          setError('Unable to get location. Please enable location services.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  };
  
  const fetchWeather = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      addToRecentSearches(city);
      setCity('');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRecentSearch = (cityName: string) => {
    setCity(cityName);
    fetchWeather(new Event('submit') as never);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex flex-col items-center p-4 md:p-8"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-2xl mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-8 drop-shadow-lg">
          Weather Forecast
        </h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <form onSubmit={fetchWeather} className="flex-1 relative">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="w-full px-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <Search className="text-gray-600" />
            </button>
          </form>
          
          <button
            onClick={fetchWeatherByLocation}
            className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2 transition-colors duration-200"
          >
            <MapPin className="w-5 h-5" />
            <span>Current Location</span>
          </button>
        </div>

        {recentSearches.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            <History className="text-white/80 w-5 h-5" />
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => handleRecentSearch(search)}
                className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white rounded-full text-sm transition-colors duration-200"
              >
                {search}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className="text-center mt-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>

      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default App;