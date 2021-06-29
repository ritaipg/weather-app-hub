let now = new Date();

let h3 = document.querySelector("h3");

let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h3.innerHTML = `${day}, ${hours}:${minutes}`;

function search(city) {
  let apiKey = "31a0d353f943e496c3f9a7f3bee813e9";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function displayCity(event) {
  event.preventDefault();
  let local = document.querySelector("#city-input");
  let city = local.value;
  search(city);
}

function handlePosition(position) {
  let latitude = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "31a0d353f943e496c3f9a7f3bee813e9";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${long}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function showWeather(response) {
  let header = document.querySelector("h2");
  let headerUpdate = document.querySelector("#temp");
  let temperature = Math.round(response.data.main.temp);
  header.innerHTML = `${response.data.name}`;
  headerUpdate.innerHTML = `${temperature}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("h4").innerHTML = response.data.weather[0].main;
  console.log(response);
}

let enterCity = document.querySelector("#enter-city");

enterCity.addEventListener("submit", displayCity);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getLocation);

search("Olhao");
