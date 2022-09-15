//need to add try/catch for location error + loading function
async function getLocation(loc) {
    const responseLocation = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${loc}&appid=2d02b7a50b9aefda383eb9a9a9b88f62`, {mode:'cors'});
    return responseLocation.json();
}

async function getWeatherData() {
    var searchLocation = document.querySelector('#location').value;
    const locationData = await getLocation(searchLocation);
    const latitude = locationData[0].lat;
    const longitutde = locationData[0].lon;
    const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitutde}&appid=2d02b7a50b9aefda383eb9a9a9b88f62`, {mode:'cors'});
    const weatherData = responseWeather.json();
    console.log(weatherData);
    return weatherData;
}

function displayWeather() {
document.querySelector('.place').textContent = document.querySelector('#location').value;
document.querySelector('.today').textContent = new Date();

getWeatherData().then (weatherInfo => {
    document.querySelector('.temp').textContent = weatherInfo.main.temp;
    document.querySelector('.weather').textContent = weatherInfo.weather[0].description;
    document.querySelector('.hl').textContent = weatherInfo.main.temp_min + ' - ' + weatherInfo.main.temp_max;
    document.querySelector('.wind').textContent = weatherInfo.wind.speed;
})

document.querySelector('#location').value = '';
}

function loadingWeather() {

}

const searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener('click', getWeatherData); 
searchBtn.addEventListener('click', displayWeather);