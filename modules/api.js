import geoloc from "./geoloc.js";

/**
 * api call function for getting current weather data from geolocation or city name
 * @param {String} lang supported language string the default is English
 * @param {String} city city name
 * @returns a Promise of Current Weather Data
 */
const apiFunc = async (lang, city) => {
  lang = lang || "en";
  let api;
  const { latitude: lat, longitude: lon } = await geoloc();
  const apiKey = "a624df4c6eeebfee1e2567bc7f5d224f";
  const url = `https://api.openweathermap.org/data/2.5/weather?`;

  if (!city) api = `${url}&lat=${lat}&lon=${lon}&lang=${lang}&appid=${apiKey}`;
  else api = `${url}q=${city}&lang=${lang}&appid=${apiKey}`;

  let weather = await fetch(api).then((response) => response.json());
  return (weather = { ...weather, timestamp: Date.now() });
};

export default apiFunc;
