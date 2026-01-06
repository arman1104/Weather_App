import { useState, useRef, useEffect } from "react";
import Logo from "../assets/images/logo.svg";
import unitIcon from "../assets/images/icon-units.svg";
import dropdownIcon from "../assets/images/icon-dropdown.svg";
import checkmarkIcon from "../assets/images/icon-checkmark.svg";
import { useWeather } from "../context/WeatherContext";
import type {
  TemperatureUnit,
  WindSpeedUnit,
  PrecipitationUnit,
} from "../utils/convertUnits";

const Header = () => {
  const { units, updateUnits } = useWeather();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const handleSwitchToImperial = () => {
  //   updateUnits({
  //     temperature: "fahrenheit",
  //     windSpeed: "mph",
  //     precipitation: "in",
  //   });
  // };

  const handleToggleUnits = () => {
    if (isImperial) {
      // Switch to Metric
      updateUnits({
        temperature: "celsius",
        windSpeed: "kmh",
        precipitation: "mm",
      });
    } else {
      // Switch to Imperial
      updateUnits({
        temperature: "fahrenheit",
        windSpeed: "mph",
        precipitation: "in",
      });
    }
  };

  const handleTemperatureChange = (unit: TemperatureUnit) => {
    updateUnits({ temperature: unit });
  };

  const handleWindSpeedChange = (unit: WindSpeedUnit) => {
    updateUnits({ windSpeed: unit });
  };

  const handlePrecipitationChange = (unit: PrecipitationUnit) => {
    updateUnits({ precipitation: unit });
  };

  const isImperial =
    units.temperature === "fahrenheit" &&
    units.windSpeed === "mph" &&
    units.precipitation === "in";

  return (
    <nav className="w-full">
      <div className="mx-auto flex max-w-7xl items-center justify-between lg:px-8 py-4">
        {/* Left: Logo */}
        <div className="flex items-center">
          <img src={Logo} alt="Weather logo" className="h-8 w-auto" />
        </div>

        {/* Right: Units Button */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="
              flex items-center gap-2
              rounded-lg
              bg-white/15
              px-4 py-3
              text-sm font-medium text-white
              backdrop-blur-md
              transition
              hover:bg-white/20
              focus:outline-none focus:ring-1 focus:ring-white
            "
          >
            <img src={unitIcon} alt="units" className="h-4 w-4" />
            <span className="font-sans">Units</span>
            <img src={dropdownIcon} alt="dropdown" className="h-3 w-3" />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 rounded-lg bg-gray-800/95 backdrop-blur-md p-4 shadow-xl z-50">
              {/* <button
                onClick={handleSwitchToImperial}
                className="w-full text-left text-sm font-medium text-white hover:text-gray-200 mb-4 pb-4 border-b border-gray-700"
              >
                Switch to {isImperial ? "Metric" : "Imperial"}
              </button> */}

              <button
                onClick={handleToggleUnits}
                className="w-full text-left text-sm font-medium text-white hover:text-gray-200 mb-4 pb-4 border-b border-gray-700"
              >
                Switch to {isImperial ? "Metric" : "Imperial"}
              </button>

              <div className="space-y-4">
                {/* Temperature */}
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-2">
                    Temperature
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleTemperatureChange("celsius")}
                      className="w-full flex items-center justify-between text-sm text-white hover:text-gray-200"
                    >
                      <span>Celsius (°C)</span>
                      {units.temperature === "celsius" && (
                        <img
                          src={checkmarkIcon}
                          alt="selected"
                          className="h-4 w-4"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => handleTemperatureChange("fahrenheit")}
                      className="w-full flex items-center justify-between text-sm text-white hover:text-gray-200"
                    >
                      <span>Fahrenheit (°F)</span>
                      {units.temperature === "fahrenheit" && (
                        <img
                          src={checkmarkIcon}
                          alt="selected"
                          className="h-4 w-4"
                        />
                      )}
                    </button>
                  </div>
                </div>

                {/* Wind Speed */}
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-2">
                    Wind Speed
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleWindSpeedChange("kmh")}
                      className="w-full flex items-center justify-between text-sm text-white hover:text-gray-200"
                    >
                      <span>km/h</span>
                      {units.windSpeed === "kmh" && (
                        <img
                          src={checkmarkIcon}
                          alt="selected"
                          className="h-4 w-4"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => handleWindSpeedChange("mph")}
                      className="w-full flex items-center justify-between text-sm text-white hover:text-gray-200"
                    >
                      <span>mph</span>
                      {units.windSpeed === "mph" && (
                        <img
                          src={checkmarkIcon}
                          alt="selected"
                          className="h-4 w-4"
                        />
                      )}
                    </button>
                  </div>
                </div>

                {/* Precipitation */}
                <div>
                  <p className="text-xs font-medium text-gray-400 mb-2">
                    Precipitation
                  </p>
                  <div className="space-y-2">
                    <button
                      onClick={() => handlePrecipitationChange("mm")}
                      className="w-full flex items-center justify-between text-sm text-white hover:text-gray-200"
                    >
                      <span>Millimeters (mm)</span>
                      {units.precipitation === "mm" && (
                        <img
                          src={checkmarkIcon}
                          alt="selected"
                          className="h-4 w-4"
                        />
                      )}
                    </button>
                    <button
                      onClick={() => handlePrecipitationChange("in")}
                      className="w-full flex items-center justify-between text-sm text-white hover:text-gray-200"
                    >
                      <span>Inches (in)</span>
                      {units.precipitation === "in" && (
                        <img
                          src={checkmarkIcon}
                          alt="selected"
                          className="h-4 w-4"
                        />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
