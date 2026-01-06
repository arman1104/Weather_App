import { useWeather } from "../context/WeatherContext";
import {
  convertTemperature,
  getTemperatureSymbol,
} from "../utils/convertUnits";
import { getWeatherIcon } from "../utils/weatherIcons";

const DailyForecast = () => {
  const { dailyForecast, units } = useWeather();

  if (dailyForecast.length === 0) return null;

  const temperature = (temp: number) =>
    convertTemperature(temp, units.temperature);
  const tempSymbol = getTemperatureSymbol(units.temperature).replace("°", "");

  return (
    <div className="w-full mt-8">
      <h3 className="text-lg font-semibold text-white font-sans mb-4">
        Daily forecast
      </h3>

      <div
        className="
          flex flex-wrap gap-3
          lg:flex-nowrap lg:gap-4 lg:overflow-x-auto
          scrollbar-hide
        "
      >
        {dailyForecast.map((day, index) => (
          <div
            key={index}
            className="
              w-[calc(33.333%-0.5rem)]
              lg:w-[100px]
              h-[130px]
              rounded-xl
              bg-white/10
              backdrop-blur-sm
              flex
              flex-col
              items-center
              justify-between
              py-3
              flex-shrink-0
            "
          >
            {/* Day */}
            <p className="text-sm font-medium text-white font-sans">
              {day.day}
            </p>

            {/* Icon */}
            <img
              src={getWeatherIcon(day.conditionCode)}
              alt="weather"
              className="h-9 w-9 object-contain"
            />

            {/* Temps (same line) */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white font-sans">
                {temperature(day.high)}°{tempSymbol}
              </span>
              <span className="text-sm text-gray-300 font-sans">
                {temperature(day.low)}°{tempSymbol}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;
