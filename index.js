// функция вставляет значение, которое вводится в поле поиска в заголовок h2, если значение 
//null - всплывает окно с просьюой ввести название города. после выполнения осущ-ся автоматическая очистка формы поиска
function currentCity(event) {
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
citynew.addEventListener("submit", currentCity); // calling function currentcity after submitting search - form
// функция вычисляет текущую дату, время и день недели


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
  let week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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

let c = 17; //переменная градусов по Цельсию с целью перевода в Фаренгейт,
  //нужно заменить на текущие градусы, запрашиваемого города

  //function that conwerting degrees in Celsius, i.e it's default but that's function switch it back
function CelsiusDegrees(event) {
  event.preventDefault();

  let h1 = document.querySelector("h1");
  h1.innerHTML = c;
}
//function that converting degrees in Celsius to Fahrenheit 
function FahrenheitDegrees(event) {
  event.preventDefault();
  let f = Math.round((c * 9) / 5 + 32);
  let h1 = document.querySelector("h1");
  h1.innerHTML = f;
}

let CelsiusLink = document.querySelector("#Celsius");
CelsiusLink.addEventListener("click", CelsiusDegrees); //link for switch to Celsius

let FahrenheitLink = document.querySelector("#Fahrenheit");
FahrenheitLink.addEventListener("click", FahrenheitDegrees); //link for switch to Fahrenheit

let currentDateTime = document.querySelector("#fullCurrentDate");
currentDateTime.innerHTML = currentDay(new Date()); //so-called installing current date and time. calling function date and timr

//get current temperature
function displayTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let t_current = document.querySelector("h1");
  t_current.innerHTML = `${temperature}`;
  let city = response.data.name;
  let c_city = document.querySelector("h2");
  c_city.innerHTML = `${city}`;
}

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

function changeColor() {
  btn.style.background = color[index];
  btn.style.color = "white";
   index = index >= colors.length - 1 ? 0 : index + 1;
}
 let button = document.querySelector("#btn-current-location");
button.addEventListener("click", displayCurrentLocation);
const btn = document.getElementById(`btn-current-locatio`);
let index = 0;
const colorsBtn = [blue, green];
btn.addEventListener("click", changeColor);