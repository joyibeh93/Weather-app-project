function displayTemperature(response) {
    console.log(response.data);
    //displaying the temperature on the screen
    let temperatureElement = document.querySelector('#temp');
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
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
}

let apiKey = 'e7ac5db1afc40d248972898a4bbd11e2';
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Nigeria&appid=${apiKey}&units=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);