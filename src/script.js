let apiKey = "67b4e943b217a50af3f220f361ac825e";
let date = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tueday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = days[date.getDay()];

let time = document.querySelector("#time");
time.innerHTML = date.toLocaleString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true,
});

function ppTemp(response){
  let temperature = document.querySelector("#temp-num");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let desciption = document.querySelector(".forcast");
  desciption.innerHTML = response.data.weather[0].main;
}
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=Phnom Penh&appid=${apiKey}&units=metric`;
axios.get(apiURL).then(ppTemp);

function showtemp(response) {
  let temperature = document.querySelector("#temp-num");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let cityValue = document.querySelector("#cityValue");
  cityValue.innerHTML = response.data.name;
  let desciption = document.querySelector(".forcast");
  desciption.innerHTML = response.data.weather[0].main;
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showtemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

let currentBtn = document.querySelector(".current-btn");

function currentTemp(response){
  let temperature = document.querySelector("#temp-num");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let cityValue = document.querySelector("#cityValue");
  cityValue.innerHTML = response.data.name;
  let desciption = document.querySelector(".forcast");
  desciption.innerHTML = response.data.weather[0].main;
}

function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(currentTemp);
}

function currentWeather(){
  navigator.geolocation.getCurrentPosition(currentPosition);
}
currentBtn.addEventListener("click", currentWeather)