import { useEffect, useRef, useState } from "react";
import searchIcon from "../assets/images/icon-search.svg";
import { useWeather } from "../context/WeatherContext";

const SearchBar = () => {
  const { searchQuery, setSearchQuery, searchLocation, searchInProgress } =
    useWeather();

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Mock suggestions (UI-only, matches design)
  const mockSuggestions = ["Berlin", "London", "New York", "Paris"];

  // ✅ FIX: Suggestions actually appear now
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      setSuggestions(mockSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setShowSuggestions(false);
    await searchLocation(searchQuery);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSuggestionClick = async (city: string) => {
    setSearchQuery(city);
    setShowSuggestions(false);
    await searchLocation(city);
  };

  return (
    <div
      ref={searchRef}
      className="flex flex-col items-center justify-center gap-3 mt-6 md:mt-8 max-w-7xl mx-auto px-4"
    >
      <div className="flex w-full max-w-xl gap-2 md:gap-3 relative">
        {/* Input */}
        <div className="relative flex-1">
          <img
            src={searchIcon}
            alt="search"
            className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4"
          />
          <input
            type="text"
            value={searchQuery}
            placeholder="Search for a place..."
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery && setShowSuggestions(true)}
            className="
              w-full
              pl-12 pr-4 py-3
              rounded-lg
              bg-white/15
              text-white text-sm font-sans
              placeholder-gray-300
              focus:outline-none focus:ring-2 focus:ring-white/50
            "
          />

          {/* Suggestions */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-gray-800/95 backdrop-blur-md shadow-xl z-50">
              {suggestions.map((city) => (
                <button
                  key={city}
                  onClick={() => handleSuggestionClick(city)}
                  className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg"
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Button */}
        <button
          onClick={handleSearch}
          disabled={searchInProgress}
          className="
            px-6 py-3
            bg-indigo-600
            rounded-lg
            text-sm font-medium text-white font-sans
            hover:bg-indigo-700
            focus:outline-none focus:ring-2 focus:ring-indigo-600
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          Search
        </button>
      </div>

      {/* Loading text */}
      {searchInProgress && (
        <p className="text-sm text-gray-400 font-sans">Search in progress</p>
      )}
    </div>
  );
};

export default SearchBar;
