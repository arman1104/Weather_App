export type TemperatureUnit = "celsius" | "fahrenheit";
export type WindSpeedUnit = "kmh" | "mph";
export type PrecipitationUnit = "mm" | "in";

export interface Units {
  temperature: TemperatureUnit;
  windSpeed: WindSpeedUnit;
  precipitation: PrecipitationUnit;
}

export const convertTemperature = (
  celsius: number,
  unit: TemperatureUnit
): number => {
  if (unit === "fahrenheit") {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
};

export const convertWindSpeed = (kmh: number, unit: WindSpeedUnit): number => {
  if (unit === "mph") {
    return Math.round(kmh * 0.621371);
  }
  return Math.round(kmh);
};

export const convertPrecipitation = (
  mm: number,
  unit: PrecipitationUnit
): number => {
  if (unit === "in") {
    return Math.round((mm / 25.4) * 100) / 100;
  }
  return Math.round(mm * 100) / 100;
};

export const getTemperatureSymbol = (unit: TemperatureUnit): string => {
  return unit === "fahrenheit" ? "°F" : "°C";
};

export const getWindSpeedSymbol = (unit: WindSpeedUnit): string => {
  return unit === "mph" ? "mph" : "km/h";
};

export const getPrecipitationSymbol = (unit: PrecipitationUnit): string => {
  return unit === "in" ? "in" : "mm";
};

// export type TemperatureUnit = "celsius" | "fahrenheit";
// export type WindSpeedUnit = "kmh" | "mph";
// export type PrecipitationUnit = "mm" | "in";

// export interface Units {
//   temperature: TemperatureUnit;
//   windSpeed: WindSpeedUnit;
//   precipitation: PrecipitationUnit;
// }

// export const convertTemperature = (c: number, u: TemperatureUnit) =>
//   u === "fahrenheit" ? Math.round((c * 9) / 5 + 32) : Math.round(c);

// export const convertWindSpeed = (kmh: number, u: WindSpeedUnit) =>
//   u === "mph" ? Math.round(kmh * 0.621371) : Math.round(kmh);

// export const convertPrecipitation = (mm: number, u: PrecipitationUnit) =>
//   u === "in" ? Math.round((mm / 25.4) * 100) / 100 : Math.round(mm);

// export const getTemperatureSymbol = (u: TemperatureUnit) =>
//   u === "fahrenheit" ? "°F" : "°C";

// export const getWindSpeedSymbol = (u: WindSpeedUnit) =>
//   u === "mph" ? "mph" : "km/h";

// export const getPrecipitationSymbol = (u: PrecipitationUnit) =>
//   u === "in" ? "in" : "mm";
