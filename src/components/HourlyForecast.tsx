import { useState } from "react";
import { useWeather } from "../context/WeatherContext";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
import { formatHour } from "../utils/formatDate";
import {
  convertTemperature,
  getTemperatureSymbol,
} from "../utils/convertUnits";
import { getWeatherIcon } from "../utils/weatherIcons";

const HourlyForecast = () => {
  const { hourlyForecast, units } = useWeather();
  const [selectedDay, setSelectedDay] = useState("Today");
  const [isOpen, setIsOpen] = useState(false);

  if (hourlyForecast.length === 0) {
    return null;
  }

  const days = [
    "Today",
    "Tomorrow",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const temperature = (temp: number) =>
    convertTemperature(temp, units.temperature);
  const tempSymbol = getTemperatureSymbol(units.temperature);

  return (
    <div className="w-full lg:w-80  bg-white/10 rounded-xl py-3 px-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white font-sans">
          Hourly forecast
        </h3>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm text-white font-sans hover:bg-white/20 transition"
          >
            <span>{selectedDay}</span>
            <img src={dropdownIcon} alt="dropdown" className="h-3 w-3" />
          </button>
          {/* day dropdown */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-2 rounded-lg bg-slate-800/100 backdrop-blur-md shadow-xl z-50 min-w-[160px]">
              {days.map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDay(day);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-white/10 first:rounded-t-lg last:rounded-b-lg font-sans"
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* weather cards */}
      <div className="space-y-3">
        {hourlyForecast.map((hour, index) => (
          <div
            key={index}
            className="flex  items-center justify-between rounded-xl bg-white/10 p-3 backdrop-blur-sm"
          >
            <div className="flex items-center justify-center gap-2">
              <img
                src={getWeatherIcon(hour.conditionCode)}
                alt="weather"
                className="h-7 w-7 object-contain"
              />
              <span className="text-sm text-white font-sans">
                {formatHour(hour.time)} PM
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-white font-sans min-w-[3rem] text-right">
                {temperature(hour.temperature)}
                {tempSymbol.replace("°", " ")}°
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
