// function to convert days and time
function formatDate(timestamp) {
    let date = new Date(timestamp);
    let Hour = date.getHours();
    if (Hour < 10) {
        Hours = ` 0 $ { Hours }`;
    }
    let Minute = date.getMinutes();
    if (Minute < 10) {
        Minutes = ` 0${Minute}`;
    }
    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];
    let day = days[date.getDay()];
    return `${day} ${Hour}:${Minute}`;
}

// FUNCTION TO DISPLAY TEMPERATURE

function displayTemperature(response) {
    //console.log(response.data);
    //displaying the temperature on the screen
    let temperatureElement = document.querySelector('#temp');

    temperatureElement.innerHTML = Math.round(response.data.main.temp);

    celciusTemperature = temperatureElement.innerHTML; // i assign the result of the gotten to Celcius Temperature
    //displaying the city on the screem
    let cityName = document.querySelector('#city');
    cityName.innerHTML = response.data.name;

    //displaying the description
    let descriptionElement = document.querySelector('#description');
    descriptionElement.innerHTML = response.data.weather[0].description;
    //displaying the wind
    let humidityElement = document.querySelector('#humidity');
    humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector('#wind');
    windElement.innerHTML = Math.round(response.data.wind.speed);
    //getting the date using function
    let dateElement = document.querySelector('#date');
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    //displaying the weather
    let iconElement = document.querySelector('#icon');
    iconElement.setAttribute(
        'src',
        `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute('alt', response.data.weather[0].description);
}

// FUNCTION TO  CITY FORCAST

function forcast() {
    let forcastElement = document.querySelector('#forecast-daily-weather');
    let forecastHtml = `<div class="row">`;
    let days = ['thur', 'fri', 'sat', 'sun', 'mon', 'tue'];
    days.forEach(function(day) {
        forecastHtml =
            forecastHtml +
            `
    <div class="col-2">
        <div class="weather-forcast-date">

            ${day.toLocaleUpperCase()}
        </div>

        <img src="https://openweathermap.org/img/wn/04d@2x.png" alt="weather-icon" width="40px">
        <div class="weather-forcast-temperature">
            <span class="weather-forcast-temperature-max">18°</span>
            <span class="weather-forcast-temperature-min"> 12°</span>
        </div>


    </div>`;
    });

    forecastHtml = forecastHtml + `</div>`;
    forcastElement.innerHTML = forecastHtml;
}

// FUNCTION TO SERACH FOR CITY

function search(cityName) {
    let apiKey = 'e7ac5db1afc40d248972898a4bbd11e2';
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}
// FUNCTION SEARCH FOR CITY INPUTTED IN THE INPUT ELEMENT
function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector('#city-input');
    search(cityInputElement.value);
}

let celciusTemperature = '';

let form = document.querySelector('#search-form');
form.addEventListener('submit', handleSubmit);

// Using another medthod of working with functions
let FahreheitLink = document.querySelector('#fahrenheit-link');
FahreheitLink.addEventListener('click', function(e) {
    e.preventDefault();
    let temperatureElement = document.querySelector('#temp');
    //remove active link fromm the celciuslink
    celciusLink.classList.remove('active');
    FahreheitLink.classList.add('active');

    let fahreheitTemperature = (celciusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahreheitTemperature);
});

let celciusLink = document.querySelector('#celcius-link');
celciusLink.onclick = function() {
    let temperatureElement = document.querySelector('#temp');
    FahreheitLink.classList.remove('active');
    celciusLink.classList.add('active');

    temperatureElement.innerHTML = celciusTemperature;
};

search('Nigeria');
forcast();