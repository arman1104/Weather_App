import { useEffect, useRef, useState } from "react";
import searchIcon from "../assets/images/icon-search.svg";
import { useWeather } from "../context/WeatherContext";

interface Suggestion {
  name: string;
  country: string;
}

const SearchBar = () => {
  const { searchQuery, setSearchQuery, searchLocation, searchInProgress } =
    useWeather();

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // ---------------- AUTOCOMPLETE ----------------
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            searchQuery
          )}&count=5`
        );

        if (!res.ok) return;

        const data = await res.json();

        if (data.results) {
          setSuggestions(
            data.results.map((item: any) => ({
              name: item.name,
              country: item.country,
            }))
          );
          setShowSuggestions(true);
        }
      } catch {
        setSuggestions([]);
      }
    }, 400); // ⏱ debounce

    return () => clearTimeout(timeout);
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

  const handleSuggestionClick = async (place: string) => {
    setSearchQuery(place);
    setShowSuggestions(false);
    await searchLocation(place);
  };

  return (
    <div
      ref={searchRef}
      className="flex flex-col items-center justify-center gap-3 mt-6 md:mt-8 max-w-7xl mx-auto px-4"
    >
      <div className="flex flex-col sm:flex-row w-full max-w-xl gap-3 relative">
        {/* INPUT */}
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

          {/* DROPDOWN */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 rounded-lg bg-[hsl(243,27%,20%)] backdrop-blur-md shadow-xl z-50">
              {suggestions.map((item, i) => (
                <button
                  key={i}
                  onClick={() =>
                    handleSuggestionClick(`${item.name}, ${item.country}`)
                  }
                  className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10"
                >
                  {item.name}, {item.country}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSearch}
          disabled={searchInProgress}
          className="
            px-6 py-3
            bg-indigo-600
            rounded-lg
            text-sm font-medium text-white
            hover:bg-indigo-700
            disabled:opacity-50
          "
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
