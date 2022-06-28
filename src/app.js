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

function showTemperature(response) {
  console.log(response.data);

  let temperature = document.querySelector("#temper");
  temperature.innerHTML = Math.round(response.data.main.temp);
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
}

let apiKey = "14a082666cde45212a997627987614d0";
let units = "metric";
let cityApi = "Kyiv";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityApi}&appid=${apiKey}&units=${units}`;

axios.get(`${apiUrl}`).then(showTemperature);
