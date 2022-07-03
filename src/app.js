function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayOrder = [date.getDay()];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[dayOrder];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  /*let days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];*/
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${forecastDay.dt}</div>
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt="Icon weather"
          class="weather-forecast-icon"
          width="40px"
          />
        <div class="weather-forecast-temperature">
          <span class="weather-forecast-temperature-max">${forecastDay.temp.max}° </span>
          <span class="weather-forecast-temperature-min">${forecastDay.temp.min}°</span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "14a082666cde45212a997627987614d0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(displayForecast);
}

function showTemperature(response) {
  let temperature = document.querySelector("#temper");
  celsiusTemperature = response.data.main.temp;
  temperature.innerHTML = Math.round(celsiusTemperature);
  let headCity = document.querySelector("#headcity");
  headCity.innerHTML = response.data.name;
  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.clouds.all;
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#currentdate");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "14a082666cde45212a997627987614d0";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(`${apiUrl}`).then(showTemperature);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#citysearch");
  search(cityInput.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");
  temperature = document.querySelector("#temper");
  let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(FahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperature = document.querySelector("#temper");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#far-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#cel-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Kyiv");
