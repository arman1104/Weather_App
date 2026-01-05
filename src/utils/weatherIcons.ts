// import iconSunny from "../assets/images/icon-sunny.webp";
// import iconPartlyCloudy from "../assets/images/icon-partly-cloudy.webp";
// import iconOvercast from "../assets/images/icon-overcast.webp";
// import iconRain from "../assets/images/icon-rain.webp";
// import iconDrizzle from "../assets/images/icon-drizzle.webp";
// import iconStorm from "../assets/images/icon-storm.webp";
// import iconSnow from "../assets/images/icon-snow.webp";
// import iconFog from "../assets/images/icon-fog.webp";

// export const getWeatherIcon = (conditionCode: number): string => {
//   // OpenWeatherMap condition codes
//   // Clear sky
//   if (conditionCode === 800) return iconSunny;

//   // Clouds
//   if (conditionCode >= 801 && conditionCode <= 804) {
//     if (conditionCode === 801) return iconPartlyCloudy;
//     return iconOvercast;
//   }

//   // Rain
//   if (conditionCode >= 500 && conditionCode <= 531) {
//     if (conditionCode >= 500 && conditionCode <= 504) return iconRain;
//     if (conditionCode >= 520 && conditionCode <= 531) return iconDrizzle;
//     return iconRain;
//   }

//   // Thunderstorm
//   if (conditionCode >= 200 && conditionCode <= 232) return iconStorm;

//   // Snow
//   if (conditionCode >= 600 && conditionCode <= 622) return iconSnow;

//   // Atmosphere (mist, fog, etc.)
//   if (conditionCode >= 701 && conditionCode <= 781) return iconFog;

//   // Default
//   return iconPartlyCloudy;
// };

// export const getWeatherDescription = (conditionCode: number): string => {
//   if (conditionCode === 800) return "Sunny";
//   if (conditionCode >= 801 && conditionCode <= 804) {
//     if (conditionCode === 801) return "Partly Cloudy";
//     if (conditionCode === 802) return "Partly Cloudy";
//     return "Overcast";
//   }
//   if (conditionCode >= 500 && conditionCode <= 504) return "Rain";
//   if (conditionCode >= 520 && conditionCode <= 531) return "Drizzle";
//   if (conditionCode >= 200 && conditionCode <= 232) return "Thunderstorm";
//   if (conditionCode >= 600 && conditionCode <= 622) return "Snow";
//   if (conditionCode >= 701 && conditionCode <= 781) return "Fog";
//   return "Partly Cloudy";
// };

import sunny from "../assets/images/icon-sunny.webp";
import cloud from "../assets/images/icon-overcast.webp";
import rain from "../assets/images/icon-rain.webp";
import snow from "../assets/images/icon-snow.webp";
import storm from "../assets/images/icon-storm.webp";
import fog from "../assets/images/icon-fog.webp";

export const getWeatherIcon = (code: number) => {
  if (code === 0) return sunny;
  if ([1, 2, 3].includes(code)) return cloud;
  if ([45, 48].includes(code)) return fog;
  if (code >= 51 && code <= 67) return rain;
  if (code >= 71 && code <= 77) return snow;
  if (code >= 95) return storm;
  return cloud;
};

export const getWeatherDescription = (code: number) => {
  if (code === 0) return "Clear sky";
  if ([1, 2, 3].includes(code)) return "Cloudy";
  if ([45, 48].includes(code)) return "Fog";
  if (code >= 51 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 95) return "Thunderstorm";
  return "Cloudy";
};
