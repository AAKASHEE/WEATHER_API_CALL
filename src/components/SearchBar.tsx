import React, { useState } from 'react';
import { validateCityName } from '../utils/validation';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateCityName(city);
    
    if (error) {
      setValidationError(error);
      return;
    }
    
    setValidationError('');
    onSearch(city.trim());
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
              setValidationError('');
            }}
            placeholder="Enter city name"
            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>
      </form>
      {validationError && (
        <p className="text-red-500 text-sm mt-1">{validationError}</p>
      )}
    </div>
  );
};