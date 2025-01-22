import React, { useState } from 'react';
import { validateCityName } from '../utils/validation';

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [validationError, setValidationError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateCityName(city);

    if (error) {
      setValidationError(error);
      shakeInput();
      return;
    }

    setValidationError('');
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 200)); // Simulated delay
    onSearch(city.trim());

    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
    setValidationError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const shakeInput = () => {
    const inputElement = document.getElementById('cityInput');
    inputElement?.classList.add('animate-shake');
    setTimeout(() => inputElement?.classList.remove('animate-shake'), 500);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-gradient-to-r from-gray-100 to-gray-200 shadow-lg p-6 rounded-lg">
      <form onSubmit={handleSubmit} className="mb-2">
        <div className="flex gap-2">
          <input
            id="cityInput"
            type="text"
            value={city}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter city name"
            className={`flex-1 px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder-gray-500 ${
              validationError ? 'border-red-500' : 'border-gray-300'
            } focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 shadow-sm`}
            aria-label="City name"
          />
          <button
            type="submit"
            className={`px-6 py-3 font-semibold text-white rounded-lg transition-all ${
              loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5 mx-auto"></div>
            ) : (
              'Search'
            )}
          </button>
          <button
            type="button"
            className="px-4 py-2 text-gray-500 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
            onClick={() => setCity('')}
          >
            Clear
          </button>
        </div>
      </form>
      {validationError && (
        <p className="text-red-500 text-sm mt-1 font-medium animate-fadeIn" aria-live="polite">
          {validationError}
        </p>
      )}
    </div>
  );
};

export default SearchBar;