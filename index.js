// функция вставляет значение, которое вводится в поле поиска в заголовок h2, если значение 
//null - всплывает окно с просьюой ввести название города. после выполнения осущ-ся автоматическая очистка формы поиска
function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#nowCity");
  // h2.innerHTML = "Paris";

  if (city.value) {
    let h2 = document.querySelector("h2");
    h2.innerHTML = `${city.value}`;
    city.innerHTML = null;
  } else {
    alert("Please, enter a city.");
  }
  let apiKey = "5773e0d67acfebf51412bf8636bf6a5b";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=${unit}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);  
  
  citynew.reset();
}

let citynew = document.querySelector("#search-city"); 
citynew.addEventListener("submit", searchCity);

 // calling function currentcity after submitting search - form
// функция вычисляет текущую дату, время и день недели
 let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function currentDay(today) {
  today = new Date();
  let currentHours = today.getHours();
  if (currentHours < 10) {
    currentHours = `0${today.getHours()}`;
  }
  let currentMinutes = today.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${today.getMinutes()}`;
  }

  let currentDate = today.getDate();
 
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentDay = week[today.getDay()];
  let currentMonth = months[today.getMonth()];
  return `${currentHours}:${currentMinutes}, ${currentDay}, ${currentDate} ${currentMonth}`;
}

let windDirection = ["N", "N / NE", "NE", "E / NE", "E", "E / SE", "SE", "S / SE", "S", "S / SW", "SW", "W / SW", "W", "W / NW", "NW", "N / NW", "N"];

let currentDateTime = document.querySelector("#fullCurrentDate");
currentDateTime.innerHTML = currentDay(new Date()); //so-called installing current date and time. calling function date and timr
let temp_current = null;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return week[day];

}

function getForecast(coordinates) {
  console.log(coordinates);
 let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let unit = "metric";
   let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(displayForecast);
}

//get current temperature
function displayTemp(response) {
  temp_current = Math.round(response.data.main.temp);
    
  let t_current = document.querySelector("h1");
  t_current.innerHTML = `${temp_current}`;
 
  let description = response.data.weather[0].description;
  let d_current = document.querySelector("#description_current");
  d_current.innerHTML = `${description}`;

  let t_min = Math.round(response.data.main.temp_min);
  let t_min_current = document.querySelector("#t_min");
  t_min_current.innerHTML = `${t_min}`;

  let t_max = Math.round(response.data.main.temp_max);
  let t_max_current = document.querySelector("#t_max");
  t_max_current.innerHTML = `${t_max}`;

  let pressure = Math.round((response.data.main.pressure) / 1.333);
  let pressure_current = document.querySelector("#pressure_current");
  pressure_current.innerHTML = `${pressure}`;

  let humidity = Math.round(response.data.main.humidity);
  let humidity_current = document.querySelector("#humidity");
  humidity_current.innerHTML = `${humidity}`;

  let wind_dir = Math.round((response.data.wind.deg) / 22.5 + 1);
  if (wind_dir >= 17) {
    wind_dir = 0;
  }
  let w_direction = windDirection[wind_dir];
  let wind_dir_cur = document.querySelector("#direction");
  wind_dir_cur.innerHTML = `${w_direction}`;

  let wind_speed = Math.round(response.data.wind.speed);
  let speed_current = document.querySelector("#speed");
  speed_current.innerHTML = `${wind_speed}`;
  
  let icon = document.querySelector("#icon_main");
  icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  icon.setAttribute("alt", response.data.weather[0].description);
  
  let city = response.data.name;
  let c_city = document.querySelector("h2");
  c_city.innerHTML = `${city}`;

  getForecast(response.data.coord);
  
}
  function FahrenheitDegrees(event) {
  event.preventDefault();
    celsiusLink.classList.remove("active");
    Fahrenheit.classList.add("active");

    Fahrenheit.classList.add("active")
  let f = Math.round(((temp_current) * 9) / 5 + 32);  
  let f_temp = document.querySelector("#temperature");
  f_temp.innerHTML = `${f}`;
  
}
 let fahrenheitLink = document.querySelector("#Fahrenheit");
  fahrenheitLink.addEventListener("click", FahrenheitDegrees); //link for switch to Fahrenheit

  function CelsiusDegrees(event) {
  event.preventDefault();
  let t_current = document.querySelector("h1");
    t_current.innerHTML = `${temp_current}`;
}
//function that converting degrees in Celsius to Fahrenheit 

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", CelsiusDegrees); //link for switch to Celsius


//get current GPS coordinate
function getCurrentLocationTemperature(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `5773e0d67acfebf51412bf8636bf6a5b`;
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);
}

function displayCurrentLocation() {
  navigator.geolocation.getCurrentPosition(getCurrentLocationTemperature);
}

let button = document.querySelector("#btn-current-location");
button.addEventListener("click", displayCurrentLocation);

function displayForecast(response) {
  
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");
  
  let forecastHTML = `<div class="row text-center forecast" id="weather-forecast">`;
  
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML = forecastHTML + `
      <div class="col-2">
        <ul>
          <li><img class="icon-forecast-day1" src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="" />
          </li>
          <li><span class="weather-forecast-temp-max">${Math.round(forecastDay.temp.max)}° </span> | <span class="weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}°</span>         </li>
          <li id="forecast_d1">${formatDay(forecastDay.dt)}</li>
      </div>`;
   
    }
  });
   forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}


//document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString())
// let firstDayForecast = Math.floor(new Date().getTime() / 1000.0);
// let forecast1 = document.querySelector("#forecast_d1");
// forecast1.innerHTML = firstDayForecast;

// const today = new Date('Wed, 14 Jun 2017 00:00:00 PDT');
// const UTCstring = today.toUTCString();
// let forecast1 = document.querySelector("#forecast_d1");
// forecast1.innerHTML = UTCstring ;