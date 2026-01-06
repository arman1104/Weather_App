import iconSunny from "../assets/images/icon-sunny.webp";
import iconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";
import iconOvercast from "../assets/images/icon-overcast.webp";
import iconRain from "../assets/images/icon-rain.webp";
import iconDrizzle from "../assets/images/icon-drizzle.webp";
import iconStorm from "../assets/images/icon-storm.webp";
import iconSnow from "../assets/images/icon-snow.webp";
import iconFog from "../assets/images/icon-fog.webp";

export const getWeatherIcon = (code: number): string => {
  // Clear sky
  if (code === 0) return iconSunny;

  // Mainly clear, partly cloudy, overcast
  if (code === 1 || code === 2) return iconPartlyCloudy;
  if (code === 3) return iconOvercast;

  // Fog
  if (code === 45 || code === 48) return iconFog;

  // Drizzle & Rain
  if (code >= 51 && code <= 55) return iconDrizzle;
  if (code >= 56 && code <= 67) return iconRain;

  // Snow
  if (code >= 71 && code <= 77) return iconSnow;

  // Rain showers
  if (code >= 80 && code <= 82) return iconRain;

  // Thunderstorm
  if (code >= 95) return iconStorm;

  // Fallback
  return iconPartlyCloudy;
};

export const getWeatherDescription = (code: number): string => {
  if (code === 0) return "Clear sky";
  if (code === 1) return "Mainly clear";
  if (code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 95) return "Thunderstorm";
  return "Partly cloudy";
};
