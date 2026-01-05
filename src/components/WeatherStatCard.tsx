import { useWeather } from "../context/WeatherContext";
import {
  convertTemperature,
  convertWindSpeed,
  convertPrecipitation,
  getTemperatureSymbol,
  getWindSpeedSymbol,
  getPrecipitationSymbol,
} from "../utils/convertUnits";

interface WeatherStatCardProps {
  label: string;
  value: number;
  type: "temperature" | "wind" | "precipitation" | "humidity";
}

const WeatherStatCard = ({ label, value, type }: WeatherStatCardProps) => {
  const { units } = useWeather();

  let displayValue: string;
  let symbol: string;

  switch (type) {
    case "temperature":
      displayValue = convertTemperature(value, units.temperature).toString();
      symbol = getTemperatureSymbol(units.temperature);
      break;
    case "wind":
      displayValue = convertWindSpeed(value, units.windSpeed).toString();
      symbol = getWindSpeedSymbol(units.windSpeed);
      break;
    case "precipitation":
      displayValue = convertPrecipitation(
        value,
        units.precipitation
      ).toString();
      symbol = getPrecipitationSymbol(units.precipitation);
      break;
    case "humidity":
      displayValue = value.toString();
      symbol = "%";
      break;
    default:
      displayValue = value.toString();
      symbol = "";
  }

  return (
    <div className="rounded-xl bg-white/10 p-3 md:p-4 backdrop-blur-sm">
      <p className="text-xs font-medium text-gray-300 font-sans mb-1">
        {label}
      </p>
      <p className="text-base md:text-lg font-semibold text-white font-sans">
        {displayValue}
        {symbol}
      </p>
    </div>
  );
};

export default WeatherStatCard;
