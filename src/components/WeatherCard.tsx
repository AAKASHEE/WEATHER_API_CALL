import React from 'react';
import { Cloud, Droplets, Thermometer, Wind, Sun, Compass, Clock, Sunrise, Sunset } from 'lucide-react';
import { WeatherData } from '../types';

interface WeatherCardProps {
  weather: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => {
  const getWeatherAnimation = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'animate-pulse bg-yellow-400';
      case 'clouds':
        return 'animate-bounce bg-gray-400';
      case 'rain':
        return 'animate-rain bg-blue-400';
      case 'drizzle':
        return 'animate-drizzle bg-blue-300';
      case 'thunderstorm':
        return 'animate-thunder bg-gray-700';
      case 'snow':
        return 'animate-snow bg-white';
      case 'mist':
        return 'animate-mist bg-gray-400';
      case 'smoke':
        return 'animate-fog bg-gray-600';
      case 'haze':
        return 'animate-mist bg-yellow-200';
      case 'dust':
        return 'animate-dust bg-yellow-600';
      case 'fog':
        return 'animate-fog bg-gray-300';
      case 'sand':
        return 'animate-dust bg-yellow-500';
      case 'ash':
        return 'animate-fog bg-gray-500';
      case 'squall':
        return 'animate-squall bg-blue-700';
      case 'tornado':
        return 'animate-tornado bg-gray-800';
      default:
        return 'bg-blue-500';
    }
  };

  const getBackgroundClass = (condition: string) => {
    return `bg-${condition.toLowerCase()}`;
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getWindDirection = (degrees: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  return (
    <div className={`w-full max-w-2xl ${getBackgroundClass(weather.weather[0].main)} bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl p-6 transform hover:scale-105 transition-all duration-300`}>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-3xl font-bold text-gray-800">
            {weather.name}, {weather.sys.country}
          </h2>
          <p className="text-xl text-gray-600 capitalize">{weather.weather[0].description}</p>
          <div className="flex items-center justify-center md:justify-start mt-2">
            <Clock className="w-4 h-4 mr-1" />
            <p className="text-sm text-gray-600">
              Local time: {formatTime(weather.dt)}
            </p>
          </div>
        </div>
        <div className={`w-24 h-24 rounded-full ${getWeatherAnimation(weather.weather[0].main)} flex items-center justify-center`}>
          <img 
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
            alt={weather.weather[0].description}
            className="w-20 h-20"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="flex items-center space-x-3">
          <Thermometer className="text-red-500 w-8 h-8" />
          <div>
            <p className="text-4xl font-bold text-gray-800">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="text-sm text-gray-600">Feels like {Math.round(weather.main.feels_like)}°C</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Wind className="text-blue-500 w-8 h-8" />
          <div>
            <div className="flex items-center">
              <p className="text-2xl font-semibold text-gray-800">
                {Math.round(weather.wind.speed)} m/s
              </p>
              <Compass className="w-4 h-4 ml-2" />
              <span className="ml-1 text-sm">{getWindDirection(weather.wind.deg)}</span>
            </div>
            <p className="text-sm text-gray-600">Wind Speed & Direction</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Droplets className="text-blue-500 w-8 h-8" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">
              {weather.main.humidity}%
            </p>
            <p className="text-sm text-gray-600">Humidity</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Cloud className="text-gray-500 w-8 h-8" />
          <div>
            <p className="text-2xl font-semibold text-gray-800">
              {weather.clouds.all}%
            </p>
            <p className="text-sm text-gray-600">Cloud Cover</p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="flex items-center justify-center space-x-2">
          <Sunrise className="text-orange-500" />
          <div>
            <p className="text-sm text-gray-600">Sunrise</p>
            <p className="text-lg font-semibold">{formatTime(weather.sys.sunrise)}</p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <Sunset className="text-orange-500" />
          <div>
            <p className="text-sm text-gray-600">Sunset</p>
            <p className="text-lg font-semibold">{formatTime(weather.sys.sunset)}</p>
          </div>
        </div>
      </div>

      {weather.main.sea_level && (
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Pressure (sea level)</p>
              <p className="text-lg font-semibold">{weather.main.sea_level} hPa</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Pressure (ground level)</p>
              <p className="text-lg font-semibold">{weather.main.grnd_level} hPa</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;