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

let history =  JSON.parse(localStorage.getItem('cityName')) || [];

//filters duplicates from history
let uniqueHistory = [...new Set(history)];

//search bar and button
searchButton.click(function () {
  cityName = searchBar.val();
  //push current cityName to cityArray in local storage
  history.push(cityName);
  localStorage.setItem('cityName', JSON.stringify(history))

  //write URL based on user-input city name
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

//create search history buttons


//Current weather

//forecast cards