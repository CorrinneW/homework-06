//reference each HTML element
const searchBar = $('#searchBar');
const searchButton = $('#searchButton');
const searchHistory = $('#searchHistory');
const currentWeather = $('#currentWeather');
const forecastContainer = $('#forecastContainer');

//global variables
let cityName = 'Columbus';

const searchURL = 'http://api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=26296fad5e8eec50db14b2b3a9c853be';

//search bar
cityName = $(searchBar).val()

//search button
//api.openweathermap.org/data/2.5/forecast?q={city name},{state code}&appid={26296fad5e8eec50db14b2b3a9c853be}
fetch(searchURL, {
  cache: "reload"
})
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

//search history buttons

//Current weather

//forecast cards