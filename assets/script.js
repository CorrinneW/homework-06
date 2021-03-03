//reference each HTML element
const searchBar = $('#searchBar');
const searchButton = $('#searchButton');
const searchHistory = $('#searchHistory');
const currentWeather = $('#currentWeather');
const forecastContainer = $('#forecastContainer');

//global variables
let inputCity;
let geolocation;
let lat;
let long;


let history =  JSON.parse(localStorage.getItem('inputCity')) || [];

//filters duplicates from history
let uniqueHistory = [...new Set(history)];

//search bar and button
searchButton.click(function () {
  inputCity = searchBar.val()
  //push current inputCity to cityArray in local storage
  history.push(inputCity);
  localStorage.setItem('inputCity', JSON.stringify(history));

  //convert inputCity to geographic coordinates
  geolocation = 'https://api.openweathermap.org/geo/1.0/direct?q='+ inputCity + '&appid=26296fad5e8eec50db14b2b3a9c853be';
  
  fetch(geolocation)
    .then(response => response.json())
    .then(data => {
      let last =data[data.length-1];
      lat = last.lat;
      lon = last.lon;
      console.log(data);
      console.log(lat, lon);
    });
});

function fetchApi(inputCity) {
  
}

//create search history buttons


//Current weather

//forecast cards