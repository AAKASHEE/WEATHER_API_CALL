import React from 'react';
import { WeatherData } from '../types/weather';

interface WeatherDisplayProps {
  weather: WeatherData;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ weather }) => {
  const getWeatherBackground = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return 'from-blue-400 to-yellow-300';
      case 'clouds':
        return 'from-gray-400 to-gray-600';
      case 'rain':
        return 'from-blue-700 to-gray-800';
      case 'snow':
        return 'from-blue-200 to-gray-400';
      default:
        return 'from-gray-500 to-gray-700';
    }
  };

  // Convert wind degree to cardinal direction
  const getWindDirection = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
  };

  return (
    <div
      className={`mt-8 p-8 rounded-lg shadow-2xl text-center bg-gradient-to-br ${getWeatherBackground(
        weather.weather[0].main
      )}`}
    >
      <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">
        {weather.name}, {weather.sys.country}
      </h2>
      <p className="text-lg text-white opacity-90 font-medium">
        {weather.weather[0].description}
      </p>

      <div className="flex justify-center items-center my-6">
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt="Weather icon"
          className="w-32 h-32 drop-shadow-lg animate-bounce-slow"
        />
        <p className="text-7xl font-extrabold ml-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500 drop-shadow-lg">
          {Math.round(weather.main.temp)}°C
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-6 text-white text-opacity-90">
        <div className="bg-white bg-opacity-30 p-4 rounded-lg shadow-md backdrop-blur-md">
          <p className="text-lg font-medium">Humidity</p>
          <p className="text-3xl font-bold">{weather.main.humidity}%</p>
        </div>
        <div className="bg-white bg-opacity-30 p-4 rounded-lg shadow-md backdrop-blur-md">
          <p className="text-lg font-medium">Wind</p>
          <p className="text-3xl font-bold">
            {weather.wind.speed} km/h ({getWindDirection(weather.wind.deg)})
          </p>
        </div>
        <div className="bg-white bg-opacity-30 p-4 rounded-lg shadow-md backdrop-blur-md">
          <p className="text-lg font-medium">Pressure</p>
          <p className="text-3xl font-bold">{weather.main.pressure} hPa</p>
        </div>
        <div className="bg-white bg-opacity-30 p-4 rounded-lg shadow-md backdrop-blur-md">
          <p className="text-lg font-medium">Visibility</p>
          <p className="text-3xl font-bold">{(weather.visibility / 1000).toFixed(1)} km</p>
        </div>
      </div>

      <div className="mt-6 text-white opacity-80">
        <p className="text-md">
          Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}
        </p>
        <p className="text-md">
          Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};
