import { useWeather } from "../context/WeatherContext";
import bgImageLarge from "../assets/images/bg-today-large.svg";
import bgImageSmall from "../assets/images/bg-today-small.svg";
import { formatDate } from "../utils/formatDate";
import {
  convertTemperature,
  getTemperatureSymbol,
} from "../utils/convertUnits";
import { getWeatherIcon, getWeatherDescription } from "../utils/weatherIcons";

const WeatherCard = () => {
  const { currentWeather, units, loading } = useWeather();

  if (loading && !currentWeather) {
    return (
      <div className="flex items-center justify-center h-64 rounded-2xl bg-white/10 mx-auto max-w-7xl px-4">
        <div className="text-center">
          <div className="flex justify-center gap-2 mb-2">
            <div
              className="h-2 w-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="h-2 w-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="h-2 w-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
          <p className="text-white font-sans">Loading...</p>
        </div>
      </div>
    );
  }

  if (!currentWeather) {
    return null;
  }

  const temperature = convertTemperature(
    currentWeather.temperature,
    units.temperature
  );
  const tempSymbol = getTemperatureSymbol(units.temperature);
  const weatherIcon = getWeatherIcon(currentWeather.conditionCode);
  const description = getWeatherDescription(currentWeather.conditionCode);

  return (
    <section
      className="
        relative
        h-64
        rounded-2xl
        bg-cover
        bg-center
        p-6
        text-white
        mx-auto
        max-w-3xl
        mt-8
      "
      style={{ backgroundImage: `url(${bgImageLarge})` }}
    >
      {/* Top content */}
      <div>
        <p className="text-sm opacity-80 font-sans">
          {formatDate(currentWeather.date)}
        </p>
        <h2 className="mt-1 text-xl font-medium font-sans">
          {currentWeather.location}, {currentWeather.country}
        </h2>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
        <div>
          <p className="font-bricolage text-5xl md:text-7xl font-bold leading-none">
            {temperature}
            {tempSymbol.replace("°", "")}°
          </p>
          <p className="mt-2 text-sm opacity-80 font-sans capitalize">
            {description}
          </p>
        </div>
        <div className="hidden sm:block">
          <img
            src={weatherIcon}
            alt={description}
            className="h-16 md:h-24 w-16 md:w-24 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default WeatherCard;
