import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { Units } from "../utils/convertUnits";

export interface CurrentWeather {
  location: string;
  country: string;
  date: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  conditionCode: number;
  description: string;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  conditionCode: number;
}

export interface DailyForecast {
  date: string;
  day: string;
  high: number;
  low: number;
  conditionCode: number;
}

interface WeatherContextType {
  currentWeather: CurrentWeather | null;
  hourlyForecast: HourlyForecast[];
  dailyForecast: DailyForecast[];
  units: Units;
  loading: boolean;
  error: string | null;
  searchInProgress: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  searchLocation: (q: string) => Promise<void>;
  updateUnits: (u: Partial<Units>) => void;
  retry: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>(
    null
  );
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecast[]>([]);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
  const [units, setUnits] = useState<Units>({
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchInProgress, setSearchInProgress] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // -------- CORE FETCH (OPEN-METEO) --------
  const fetchWeather = async (
    lat: number,
    lon: number,
    location: string,
    country: string
  ) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`
      );

      if (!res.ok) throw new Error("API error");

      const data = await res.json();
      // console.log(data);

      // CURRENT
      setCurrentWeather({
        location,
        country,
        date: new Date().toISOString(),
        temperature: data.current.temperature_2m,
        feelsLike: data.current.apparent_temperature,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        precipitation: data.current.precipitation,
        conditionCode: data.current.weather_code,
        description: "",
      });

      // HOURLY (next 8 hours)
      setHourlyForecast(
        data.hourly.time.slice(0, 8).map((time: string, i: number) => ({
          time,
          temperature: data.hourly.temperature_2m[i],
          conditionCode: data.hourly.weather_code[i],
        }))
      );

      // DAILY (7 days)
      setDailyForecast(
        data.daily.time.map((date: string, i: number) => ({
          date,
          day: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
          high: data.daily.temperature_2m_max[i],
          low: data.daily.temperature_2m_min[i],
          conditionCode: data.daily.weather_code[i],
        }))
      );
    } catch {
      setError("API error");
      setCurrentWeather(null);
      setHourlyForecast([]);
      setDailyForecast([]);
    } finally {
      setLoading(false);
    }
  };

  // -------- SEARCH (OPEN-METEO GEOCODING) --------
  const searchLocation = async (query: string) => {
    if (!query.trim()) return;

    try {
      setSearchInProgress(true);
      setError(null);

      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          query
        )}&count=1`
      );

      if (!res.ok) throw new Error();

      const data = await res.json();
      if (!data.results || data.results.length === 0) {
        setError("No search result found!");
        setCurrentWeather(null);
        setHourlyForecast([]);
        setDailyForecast([]);
        return;
      }

      const place = data.results[0];
      await fetchWeather(
        place.latitude,
        place.longitude,
        place.name,
        place.country
      );
    } catch {
      setError("API error");
    } finally {
      setSearchInProgress(false);
    }
  };

  const updateUnits = (u: Partial<Units>) =>
    setUnits((prev) => ({ ...prev, ...u }));

  const retry = () => {
    if (currentWeather) {
      searchLocation(`${currentWeather.location}`);
    }
  };

  useEffect(() => {
    searchLocation("Berlin");
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        hourlyForecast,
        dailyForecast,
        units,
        loading,
        error,
        searchInProgress,
        searchQuery,
        setSearchQuery,
        searchLocation,
        updateUnits,
        retry,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error("useWeather must be used inside WeatherProvider");
  return ctx;
};
