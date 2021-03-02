//reference each HTML element
const searchBar = $('#searchBar');
const searchButton = $('#searchButton');
const searchHistory = $('#searchHistory');
const currentWeather = $('#currentWeather');
const forecastContainer = $('#forecastContainer');

//global variables
let cityName;

let currentURL;

let forecastURL;
//search bar

//search button
//api.openweathermap.org/data/2.5/forecast?q={city name},{state code}&appid={26296fad5e8eec50db14b2b3a9c853be}
searchButton.click(function () {
  cityName = searchBar.val();
  currentURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=26296fad5e8eec50db14b2b3a9c853be';
  forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&units=imperial&appid=26296fad5e8eec50db14b2b3a9c853be';
  fetch(currentURL, {
    cache: "reload"
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
  
  fetch(forecastURL, {
    cache: "reload"
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });  
});

//search history buttons

//Current weather

//forecast cards