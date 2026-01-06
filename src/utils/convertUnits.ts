export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "kmh" | "mph";
export type PrecipitationUnit = "mm" | "in";

export interface Units {
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
  precipitation: PrecipitationUnit;
}

export const convertTemperature = (c: number, u: TemperatureUnit) =>
  u === "fahrenheit" ? Math.round((c * 9) / 5 + 32) : Math.round(c);

export const convertWindSpeed = (kmh: number, u: WindSpeedUnit) =>
  u === "mph" ? Math.round(kmh * 0.621371) : Math.round(kmh);

export const convertPrecipitation = (mm: number, u: PrecipitationUnit) =>
  u === "in" ? Math.round((mm / 25.4) * 100) / 100 : Math.round(mm);

export const getTemperatureSymbol = (u: TemperatureUnit) =>
  u === "fahrenheit" ? "°F" : "°C";

export const getWindSpeedSymbol = (u: WindSpeedUnit) =>
  u === "mph" ? "mph" : "km/h";

export const getPrecipitationSymbol = (u: PrecipitationUnit) =>
  u === "in" ? "in" : "mm";
