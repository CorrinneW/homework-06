//reference each HTML element
const searchBar = $('#searchBar');
const searchButton = $('#searchButton');
const searchHistory = $('#searchHistory');
const currentWeather = $('#currentWeather');
const forecastContainer = $('#forecastContainer');

//global variables
let inputCity;
let geolocation;
let onecall;
let lat;
let lon;


const history =  JSON.parse(localStorage.getItem('inputCity')) || [];

//filters duplicates from history
const uniqueHistory = [...new Set(history)];


//call openweathermap data for lastCity
function buildContent(city) {

  geolocation = 'https://api.openweathermap.org/geo/1.0/direct?q='+ city + '&appid=26296fad5e8eec50db14b2b3a9c853be';

  fetch(geolocation)
    .then(response => response.json())
    .then(data => {
      let last = data[data.length-1];
      lat = last.lat;
      lon = last.lon;
      onecall = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&units=imperial&exclude=minutely,hourly,alerts&appid=26296fad5e8eec50db14b2b3a9c853be'

      fetch(onecall)
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
    });
}  

//search bar and button
searchButton.click(function () {
  inputCity = searchBar.val()
  //push current inputCity to cityArray in local storage
  //history.inlcudes or contains (check MDN)
  //if (!history.includes) then ignore
  history.push(inputCity);
  localStorage.setItem('inputCity', JSON.stringify(history));
  buildContent(inputCity);
  // location.reload();  
});

//create search history buttons
for(i = 0; i < uniqueHistory.length; i++) {
  searchHistory.prepend(
    $('<button/>')
      .addClass('.historyBtn')
      .text(uniqueHistory[i])
  );
}

// //Current weather
// function buildCurrent() {};

// //forecast cards
// function buildForecast();