const apiKey = "67b4e943b217a50af3f220f361ac825e";
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

function displayCurrentDateAndTime() {
  currentDay.textContent = daysOfWeek[currentDate.getDay()];
  currentTime.textContent = currentDate.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}

function displayWeather(response) {
  temperature.textContent = Math.round(response.data.main.temp);
  cityValue.textContent = response.data.name;
  forecast.textContent = response.data.weather[0].main;
}

function fetchWeatherData(cityName) {
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
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
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiURL).then(displayWeather);
  });
}

// Fetch weather data for the default city
fetchWeatherData("Phnom Penh");

// Event listeners
form.addEventListener("submit", searchCity);
currentBtn.addEventListener("click", fetchCurrentLocationWeather);
displayCurrentDateAndTime();