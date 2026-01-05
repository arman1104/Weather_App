import { useWeather } from "../context/WeatherContext";
import { convertTemperature, getTemperatureSymbol } from "../utils/convertUnits";
import { getWeatherIcon } from "../utils/weatherIcons";

const DailyForecast = () => {
  const { dailyForecast, units } = useWeather();

  if (dailyForecast.length === 0) {
    return null;
  }

  const temperature = (temp: number) => convertTemperature(temp, units.temperature);
  const tempSymbol = getTemperatureSymbol(units.temperature);

  return (
    <div className="w-full mt-8">
      <h3 className="text-lg font-semibold text-white font-sans mb-4">Daily forecast</h3>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {dailyForecast.map((day, index) => (
          <div
            key={index}
            className="flex-shrink-0 rounded-xl bg-white/10 p-3 md:p-4 backdrop-blur-sm min-w-[90px] md:min-w-[100px]"
          >
            <p className="text-sm font-medium text-white font-sans mb-2">{day.day}</p>
            <div className="flex flex-col items-center gap-2">
              <img
                src={getWeatherIcon(day.conditionCode)}
                alt="weather"
                className="h-10 w-10 object-contain"
              />
              <div className="text-center">
                <p className="text-sm font-semibold text-white font-sans">
                  {temperature(day.high)}{tempSymbol.replace("°", "")}°
                </p>
                <p className="text-xs text-gray-300 font-sans">
                  {temperature(day.low)}{tempSymbol.replace("°", "")}°
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecast;

