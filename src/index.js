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

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
            <div class="weather-forecast-day">${day}</div>
            
            <img src="http://openweathermap.org/img/wn/01d@2x.png" alt="" width="36"/>
            <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperatures-max">18</span>º |
            <span class="weather-forecast-temperatures-min">12</span>º
            </div>
          </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "31a0d353f943e496c3f9a7f3bee813e9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
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

  getForecast(response.data.coord);
}

let enterCity = document.querySelector("#enter-city");

enterCity.addEventListener("submit", displayCity);

let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getLocation);

function showFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

search("Olhao");
