import apiFunc from "./modules/api.js";
import { toCelcius, toFahrenheit } from "./modules/temperature.js";
import clock from "./modules/clock.js";
import { speed } from "./modules/speed.js";
import { stringToElement as mel } from "./modules/stringToElement.js";

const main = mel(`<main></main>`),
  app = mel(`<div class="app"></div>`),
  header = mel(`<header></header>`),
  section = mel(`<span class="section"></span>`),
  span = mel(`<span class="span"></span>`),
  icon = mel(
    `<span>
      <img src="http://openweathermap.org/img/wn/01d.png" alt="weather-icon" />
    </span>`
  ),
  searchBox = mel(
    `<form class="search-box">
      <input type="search" autocomplete="off" placeholder="Enter City" />
      <button type="submit"><i class="bi bi-search"></i></button>
      <button type="reset"><i class="bi bi-geo-alt"></i></button>
    </form>`
  ),
  title = mel(`<span class="title">Cuaca Saat ini</span>`),
  city = mel(`<span class="city">Loading data...</span>`),
  time = mel(`<span class="time"></span>`),
  summary = mel(`<div class="summary"></div>`),
  temp = mel(`<span class="temp"></span>`),
  tempDet = mel(
    `<div class="temp-det">
        <span class="desc"></span>
        <div class="temp-fl">
            <span>Terasa seperti</span>
            <span>...</span>
        </div>
    </div>`
  ),
  detail = mel(`<div class="detail"></div>`),
  wind = mel(
    `<div class="wind">
        <span>Angin</span>
        <span>...</span>
    </div>`
  ),
  humidity = mel(
    `<div class="humidity">
        <span>Kelembapan</span>
        <span>...</span>
    </div>`
  ),
  pressure = mel(
    `<div class="pressure">
        <span>Tekanan</span>
        <span>...</span>
    </div>`
  );

// rendering elements to DOM
document.body.prepend(app);
app.append(main);
main.append(header, summary, detail);
header.append(searchBox, title, city, time);
// span.append(section, icon);
summary.append(temp, section);
section.append(icon, tempDet);
detail.append(wind, humidity, pressure);

// destruct data from api
const desWeather = (obj) => {
  const { name: location } = obj,
    { description: weatherDesc, icon } = obj.weather[0],
    { speed: windSpeed } = obj.wind,
    { feels_like: tempfl, temp, humidity, pressure } = obj.main;
  return {
    location,
    weatherDesc,
    icon,
    windSpeed,
    temp,
    tempfl,
    humidity,
    pressure,
  };
};

// nasa apod images
const apod = async () => {
  const api =
    "https://api.nasa.gov/planetary/apod?api_key=523p5hPYHGzafYGLCkqa54kKMTV2vbP0XcPxkcLm";
  const data = await fetch(api).then((res) => res.json());
  return data.url;
};

// get data from api and inser into element
const getData = async (lang, area) => {
  // destructuring data from api
  const {
      location,
      weatherDesc,
      icon: ic,
      windSpeed,
      temp: tp,
      tempfl: tpfl,
      humidity: hum,
      pressure: pres,
    } = desWeather(await apiFunc(lang, area)),
    url = await apod();

  // inserting api data into elements
  city.textContent = location;
  temp.textContent = toCelcius(tp, "kelvin");
  clock(time);
  tempDet.firstElementChild.textContent = weatherDesc;
  icon.firstElementChild.src = `http://openweathermap.org/img/wn/${ic}.png`;
  tempDet.lastElementChild.lastElementChild.textContent = toCelcius(
    tpfl,
    "kelvin"
  );
  wind.lastElementChild.textContent = speed(windSpeed) + " km/h";
  humidity.lastElementChild.textContent = hum + "%";
  pressure.lastElementChild.textContent = pres + " hPa";
  app.style = `background-image: url(${url});`;
  // setTimeout(async () => await getData(lang, area), 1000);
  console.log("weather updated", new Date().toLocaleTimeString());
};

window.addEventListener("load", async () => await getData("id"));
searchBox.addEventListener("reset", async () => await getData("id"));
searchBox.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (!this.firstElementChild.value.trim()) return;
  await getData("id", this.firstElementChild.value);
});

setInterval(() => {
  let value = searchBox.firstElementChild.value.trim();
  !value ? getData("id") : getData("id", value);
}, 1000 * 60 * 5);
