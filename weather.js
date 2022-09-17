//need to add try/catch for location error + loading function
async function getLocation(loc) {
    const responseLocation = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${loc}&appid=2d02b7a50b9aefda383eb9a9a9b88f62`, {mode:'cors'});
    return responseLocation.json();
}

async function getWeatherData() {
    try {var searchLocation = document.querySelector('#location').value;
    const locationData = await getLocation(searchLocation);
    const latitude = locationData[0].lat;
    const longitutde = locationData[0].lon;
    const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitutde}&appid=2d02b7a50b9aefda383eb9a9a9b88f62`, {mode:'cors'});
    const weatherData = responseWeather.json();
    console.log(weatherData);
    return weatherData;
    } catch(error) {
        document.querySelector('.place').textContent = 'Oops, location not found'
    }
}

const loader = document.querySelector('.loading');
function loadingWeather() {
    loader.classList.add('display');
    setTimeout(() => {
        loader.classList.remove('display');
    }, 5000);
}
function hideLoading() {
    loader.classList.remove('display');
}

function tempKtoC(k) {
    return Math.round(k-273.1) + ' °C';
}
function tempKtoF(k) {
    return Math.round((k - 273.1)*9/5 + 32) + ' °F';
}

function displayWeather() {
loadingWeather();

getWeatherData().then (weatherInfo => {
    hideLoading();
    document.querySelector('.place').textContent = weatherInfo.name;
    document.querySelector('.today').textContent = new Date().toDateString();
    document.querySelector('.temp').textContent = tempKtoF(weatherInfo.main.temp);
    document.querySelector('.weather').textContent = weatherInfo.weather[0].description;
    document.querySelector('.hl').textContent = tempKtoF(weatherInfo.main.temp_min) + ' - ' + tempKtoF(weatherInfo.main.temp_max);
    document.querySelector('.wind').textContent = weatherInfo.wind.speed + 'm/s';
})

document.querySelector('#location').value = '';
}

const searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener('click', getWeatherData); 
searchBtn.addEventListener('click', displayWeather);