import { useWeather } from "../context/WeatherContext";
import { formatDate } from "../utils/formatDate";
import {
  convertTemperature,
  getTemperatureSymbol,
} from "../utils/convertUnits";
import { getWeatherIcon } from "../utils/weatherIcons";

const WeatherCard = () => {
  const { currentWeather, units, loading } = useWeather();

  if (loading && !currentWeather) {
    return (
      <div className="h-64 rounded-2xl bg-white/10 flex items-center justify-center">
        <p className="text-white font-sans">Loading...</p>
      </div>
    );
  }

  if (!currentWeather) return null;

  const temperature = convertTemperature(
    currentWeather.temperature,
    units.temperature
  );
  const tempSymbol = getTemperatureSymbol(units.temperature);
  const weatherIcon = getWeatherIcon(currentWeather.conditionCode);

  return (
    <section
      className="
        h-64
        rounded-2xl
        bg-cover
        bg-center
        px-6
        py-6
        text-white
        w-full

        flex flex-col
        md:flex-row
        md:items-center

        bg-[url('/src/assets/images/bg-today-small.svg')]
        md:bg-[url('/src/assets/images/bg-today-large.svg')]
        
      "
    >
      {/* TOP / LEFT */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-xl font-medium font-sans">
          {currentWeather.location}, {currentWeather.country}
        </h2>
        <p className="mt-1 text-sm opacity-80 font-sans">
          {formatDate(currentWeather.date)}
        </p>
      </div>

      {/* GAP ON MOBILE */}
      <div className="h-6 md:hidden" />

      {/* CENTER (mobile) / CENTER COLUMN (desktop) */}
      <div className="flex-1 flex items-center justify-center gap-4">
        <img
          src={weatherIcon}
          alt="weather"
          className="h-16 w-16 md:h-20 md:w-20 object-contain"
        />

        {/* Temperature on mobile stays with icon */}
        <p className="font-bricolage text-5xl md:hidden font-bold leading-none">
          {temperature}
          {tempSymbol.replace("°", "")}°
        </p>
      </div>

      {/* RIGHT (desktop only) */}
      <div className="hidden md:flex flex-1 justify-end">
        <p className="font-bricolage text-6xl md:text-7xl font-bold leading-none">
          {temperature}
          {tempSymbol.replace("°", "")}°
        </p>
      </div>
    </section>
  );
};

export default WeatherCard;
