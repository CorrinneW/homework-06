//reference each HTML element
const searchBar = document.querySelector('#searchBar');
const searchButton = document.querySelector('#searchButton');
const searchHistory = document.querySelector('#searchHistory');
const currentWeather = document.querySelector('#currentWeather');
const forecastContainer = document.querySelector('#forecastContainer');

//global variables
let inputCity;
let geolocation;
let onecall;
let lat;
let lon;


const history =  JSON.parse(localStorage.getItem('inputCity')) || [];

//filters duplicates from history
// const uniqueHistory = [...new Set(history)];


//call openweathermap data for lastCity
function buildContent(city) {

  geolocation = 'https://api.openweathermap.org/geo/1.0/direct?q='+ city + '&appid=26296fad5e8eec50db14b2b3a9c853be';

  //uses lat and lon from geolocation api to specify location for onecall api
  fetch(geolocation)
    .then(response => response.json())
    .then(data => {
      let last = data[data.length-1];
      lat = last.lat;
      lon = last.lon;
      onecall = 'https://api.openweathermap.org/data/2.5/onecall?lat='+ lat +'&lon='+ lon +'&units=imperial&exclude=minutely,hourly,alerts&appid=26296fad5e8eec50db14b2b3a9c853be'

      //builds current weather and forecast based on onecall api data
      fetch(onecall)
        .then(response => response.json())
        .then(data => {
          let currentDate = new Date().getDate()
          //gets current month and year
          let month = new Date().getMonth();
          let year = new Date().getFullYear();
          let currentTitle = document.createElement('h2')
          currentTitle.textContent = city + ' (' +currentDate + '/' + month + '/' + year + ')';
           
          console.log(data);
          currentWeather.appendChild(currentTitle);

          //5 day forecast
          //api supplies 7 days of weather, slice to get 5
          let fiveDays = data.daily.slice(1, 6);
          for(i=1; i<6; i++) {
            //gets forecast date
            let date = new Date().getDate() + i;
            let dateText = document.createElement('p')
            dateText.textContent = month + '/' + date + '/' + year;
            console.log(dateText)
            let forecastContent = document.createElement('div');
            let temperature = document.createElement('p');
            temperature.classList.add('forecastTemp')
            temperature.textContent = fiveDays[i-1].temp.day;
            forecastContent.appendChild(dateText);
            forecastContent.appendChild(temperature);
            forecastContainer.appendChild(forecastContent);
          }
        })
    });
}  

//search bar and button
searchButton.addEventListener('click', function (event) {
  event.preventDefault()
  console.log('hello')
  inputCity = searchBar.value
  //push current inputCity to cityArray in local storage
  //history.inlcudes or contains (check MDN)
  //if (!history.includes) then ignore
  history.push(inputCity);
  localStorage.setItem('inputCity', JSON.stringify(history));
  buildContent(inputCity);
  // location.reload();  
});

// //create search history buttons
// for(i = 0; i < uniqueHistory.length; i++) {
//   searchHistory.prepend(
//     $('<button/>')
//       .addClass('.historyBtn')
//       .text(uniqueHistory[i])
//   );
// }

// //Current weather
// function buildCurrent() {};

// //forecast cards
// function buildForecast();