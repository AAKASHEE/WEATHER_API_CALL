import axios from 'axios';
import { WeatherData } from '../types/weather';

const API_KEY = '60483a06ce784f26cc9e9c200f8a5c22';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error(`Cannot find weather data for "${city}". Please check the city name and try again.`);
    }
    throw new Error('An error occurred while fetching the weather data.');
  }
};