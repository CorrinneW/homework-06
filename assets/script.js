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
          //converts onecall api dt to mm/dd/yyyy format
          let dt = data.current.dt
          let currentDate = new Date(dt * 1000).toLocaleDateString('en-US');

          //create container for the currentWeather header
          let headerContainer = document.createElement('div');
          currentWeather.appendChild(headerContainer)

          //create container for currentWeather content
          let contentContainer = document.createElement('div');
          currentWeather.appendChild(contentContainer);

          //create currentHeader and append to headerContainer
          let currentHeader = document.createElement('h2')
          currentHeader.textContent = city + ' (' + currentDate + ')';
          console.log(data);
          headerContainer.appendChild(currentHeader);

          //get current weather icon and append to headerContainer
          let iconContainer = document.createElement('div');
          headerContainer.appendChild(iconContainer);
          let icon = document.createElement('img');
          let iconCode = data.current.weather[0].icon;
          let iconUrl = 'https://openweathermap.org/img/wn/'+ iconCode +'@2x.png';
          icon.setAttribute('src', iconUrl)
          console.log(icon);
          iconContainer.appendChild(icon);

          //get current temp and append to contentContainer
          let temperature = document.createElement('p');
          temperature.textContent = 'Temperature: ' + data.current.temp;
          contentContainer.appendChild(temperature);

          //get current humidity and append to contentContainer
          let humidity = document.createElement('p');
          humidity.textContent = 'Humidity: ' + data.current.humidity;
          contentContainer.appendChild(humidity);

          //get current windspeed and append to contentContainer
          let windspeed = document.createElement('p');
          windspeed.textContent = 'Wind Speed: ' + data.current.wind_speed;
          contentContainer.appendChild(windspeed);    
          
          //get current UV index and append to contentContainer
          let uvi = document.createElement('p');
          uvi.textContent = 'UV Index: ' + data.current.uvi;
          contentContainer.appendChild(uvi);

          //5 day forecast
          //api supplies 7 days of weather, slice to get 5
          let fiveDays = data.daily.slice(1, 6);
          for(i=1; i<6; i++) {
            //create div to hold forecast & append to container
            let forecastContent = document.createElement('div');
            forecastContainer.appendChild(forecastContent);

            //get forecast date & append to forecastContent
            let dt = fiveDays[i-1].dt
            let date = new Date(dt * 1000).toLocaleDateString('en-US');
            let dateText = document.createElement('h3')
            dateText.textContent = date;
            forecastContent.appendChild(dateText);

            //get weather icon & append to forecastContent
            let iconContainer = document.createElement('div');
            forecastContent.appendChild(iconContainer);
            let icon = document.createElement('img');
            let iconCode = fiveDays[i-1].weather[0].icon;
            let iconUrl = 'https://openweathermap.org/img/wn/'+ iconCode +'.png';
            icon.setAttribute('src', iconUrl)
            console.log(icon);
            iconContainer.appendChild(icon);

            //get forecast temp & append to forecastContent
            let temperature = document.createElement('p');
            temperature.textContent = 'Temp: ' + fiveDays[i-1].temp.day;
            forecastContent.appendChild(temperature);

            //get forecast humidity & append to forecastContent
            let humidity = document.createElement('p');
            humidity.textContent = 'Humidity: ' + fiveDays[i-1].humidity + '%';
            forecastContent.appendChild(humidity);
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