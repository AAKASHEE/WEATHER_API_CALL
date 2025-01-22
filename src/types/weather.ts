export interface WeatherData {
  temp(temp: any): import("react").ReactNode;
  main: {
    temp: number;         // Current temperature
    humidity: number;     // Humidity percentage
    feels_like: number;   // Feels-like temperature
    pressure: number;     // Atmospheric pressure in hPa
  };
  weather: Array<{
    main: string;         // Main weather condition (e.g. Rain, Clear)
    description: string;  // Detailed weather description
    icon: string;         // Weather icon ID
  }>;
  wind: {
    speed: number;        // Wind speed in km/h
    deg: number;          // Wind direction in degrees
  };
  visibility: number;      // Visibility in meters
  sys: {
    country: string;      // Country code (e.g. "US")
    sunrise: number;      // Sunrise timestamp (Unix)
    sunset: number;       // Sunset timestamp (Unix)
  };
  name: string;            // City name
  timezone: number;        // Timezone offset in seconds
  coord: {
    lat: number;          // Latitude coordinate
    lon: number;          // Longitude coordinate
  };
}
