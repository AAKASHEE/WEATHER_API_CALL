export interface WeatherData {
  name: string;
  dt: number;
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
    pressure: number;
    sea_level?: number;
    grnd_level?: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  visibility: number;
}