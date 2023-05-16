const apiKey = "t4o1acab04a308bdff40a28e33ddea66";
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const currentDate = new Date();
const currentDay = document.querySelector("#current-day");
const currentTime = document.querySelector("#time");
const temperature = document.querySelector("#temp-num");
const cityValue = document.querySelector("#cityValue");
const forecast = document.querySelector(".forecast");
const form = document.querySelector("form");
const currentBtn = document.querySelector(".current-btn");
const icon = document.querySelector("#icon");
const wind = document.querySelector("#wind-speed");
const huhumidity = document.querySelector("#humidity-element");
const pressure = document.querySelector("#pressure");
const feelLike = document.querySelector("#feel-like");

function displayCurrentDateAndTime() {
  currentDay.textContent = daysOfWeek[currentDate.getDay()];
  currentTime.textContent = currentDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

function displayWeather(response) {
  celsiusTemperature = response.data.temperature.current;
  temperature.textContent = Math.round(celsiusTemperature);
  cityValue.textContent = response.data.city;
  let desciption = document.querySelector(".forcast");
  desciption.innerHTML = response.data.condition.description;
  icon.setAttribute("src", response.data.condition.icon_url);
  wind.textContent = response.data.wind.speed;
  huhumidity.textContent = response.data.temperature.humidity;
  pressure.textContent = response.data.temperature.pressure;
  feelLike.textContent = Math.round(response.data.temperature.feels_like);
}

function fetchWeatherData(cityName) {
  const apiURL = `https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric
`;
  axios.get(apiURL).then(displayWeather);
}

function searchCity(event) {
  event.preventDefault();
  const cityInput = document.querySelector("#city-input").value;
  fetchWeatherData(cityInput);
}

function fetchCurrentLocationWeather() {
  navigator.geolocation.getCurrentPosition((position) => {
    const { latitude, longitude } = position.coords;
    const apiURL = `https://api.shecodes.io/weather/v1/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayWeather);
  });
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-num");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp-num");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
// Fetch weather data for the default city
fetchWeatherData("Phnom Penh");

// Event listeners
form.addEventListener("submit", searchCity);
currentBtn.addEventListener("click", fetchCurrentLocationWeather);
displayCurrentDateAndTime();

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
