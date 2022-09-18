//need to add try/catch for location error + loading function
async function getWeatherData() {
    const searchLocation = document.querySelector('#location').value;
    const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=2d02b7a50b9aefda383eb9a9a9b88f62`, {mode:'cors'});
    const weatherData = responseWeather.json();
    console.log(weatherData);
    return weatherData;
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
function weatherLogo(wData) {
    const weatherIcon = document.querySelector('.weatherIcon');
    if(wData.weather[0].main === 'Clouds') {
        return weatherIcon.innerHTML = '<img src="./imgs/cloud.svg">';
    } else if (wData.weather[0].main === 'Rain' || wData.weather[0].main === 'Drizzle') {
        return weatherIcon.innerHTML = '<img src="./imgs/rain.svg">';
    } else if (wData.weather[0].main === 'Thunderstorm') {
        return weatherIcon.innerHTML = '<img src="./imgs/lightning.svg">';
    } else if (wData.weather[0].main === 'Snow') {
        return weatherIcon.innerHTML = '<img src="./imgs/snow.svg">';
    } else if (wData.weather[0].main === 'Clear') {
        return weatherIcon.innerHTML = '<img src="./imgs/sun.svg">';
    } else {
        return weatherIcon.innerHTML = '<img src="./imgs/mist.svg">';
    }
}

function displayWeather() {
    loadingWeather();

    getWeatherData()
        .then (weatherInfo => {
        hideLoading();
        document.querySelector('.place').textContent = weatherInfo.name;
        document.querySelector('.today').textContent = new Date().toDateString();
        document.querySelector('.temp').textContent = tempKtoF(weatherInfo.main.temp);
        document.querySelector('.weather').textContent = weatherInfo.weather[0].description;
        weatherLogo(weatherInfo);
        document.querySelector('.hl').textContent = tempKtoF(weatherInfo.main.temp_min) + ' - ' + tempKtoF(weatherInfo.main.temp_max);
        document.querySelector('.wind').textContent = weatherInfo.wind.speed + 'm/s';
        }).catch(() => {
            document.querySelector('.place').textContent = 'Oops, location not found';
        })

    document.querySelector('#location').value = '';
}

const searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener('click', displayWeather);

