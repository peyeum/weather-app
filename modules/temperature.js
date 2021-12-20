import { round10 } from "./decimal.js";

export const toCelcius = (value, type) => {
  let convertedVal;
  switch (type) {
    case "fahrenheit":
      convertedVal = fToC(value);
      break;
    case "kelvin":
      convertedVal = kToC(value);
      break;
    case "rankie":
      convertedVal = rToC(value);
      break;
    // default:
  }
  return convertedVal + "\xB0C";
};

export const toFahrenheit = (value, type) => {
  let convertedVal;
  switch (type) {
    case "celcius":
      convertedVal = cToF(value);
      break;
    case "kelvin":
      convertedVal = kToF(value);
      break;
    case "rankie":
      convertedVal = rToF(value);
      break;
    // default:
  }
  return convertedVal + "\xB0F";
};

// temperature to Celcius
const fToC = (value) => round10((value - 32) / (9 / 5), -1),
  kToC = (value) => round10(value - 273.15, -1),
  rToC = (value) => round10(((value - 491.67) * 5) / 9, -1);

// temperature to Fahrenheit
const cToF = (value) => round10(value * 1.8 + 32, -1),
  kToF = (value) => round10((value * 9) / 5 - 459.67, -1),
  rToF = (value) => round10(value - 459.67, -1);
