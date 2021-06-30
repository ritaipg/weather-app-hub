function formatUpdateTime(timestamp) {
  let now = new Date(timestamp);

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
  return `${day}, ${hours}:${minutes}`;
}

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
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let icon = document.querySelector("#icon");

  header.innerHTML = `${response.data.name}`;
  headerUpdate.innerHTML = `${temperature}`;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("h4").innerHTML = response.data.weather[0].main;
  document.querySelector("#update").innerHTML = formatUpdateTime(
    response.data.dt * 1000
  );
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
  console.log(response);
}

let enterCity = document.querySelector("#enter-city");

enterCity.addEventListener("submit", displayCity);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getLocation);

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;

  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

search("Olhao");
