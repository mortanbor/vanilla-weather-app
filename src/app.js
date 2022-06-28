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
}

let apiKey = "14a082666cde45212a997627987614d0";
let units = "metric";
let cityApi = "Kyiv";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityApi}&appid=${apiKey}&units=${units}`;

axios.get(`${apiUrl}`).then(showTemperature);
