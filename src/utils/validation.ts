export const validateCityName = (city: string): string | null => {
  if (!city.trim()) {
    return 'Please enter a city name';
  }
  
  // Basic city name validation
  if (!/^[a-zA-Z\s-]+$/.test(city)) {
    return 'City name should only contain letters, spaces, and hyphens';
  }
  
  return null;
};