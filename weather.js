//need to fix: - between min&max; 

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

function showCurrentWeather(wData) {
    document.querySelector('.place').textContent = wData.name;
    const weatherDes = wData.weather[0].description
    document.querySelector('.weather').textContent = weatherDes.charAt(0).toUpperCase() + weatherDes.slice(1);
    weatherLogo(wData);
    document.querySelector('.temp.now').textContent = tempKtoF(wData.main.temp);
    document.querySelector('.feelIcon').innerHTML = `
    <img src="./imgs/thermometer.svg"> Feels like
    `;
    document.querySelector('.temp.feel').textContent = tempKtoF(wData.main.feels_like);
    document.querySelector('.minTemp').textContent = 'Low: ';
    document.querySelector('.l').textContent = tempKtoF(wData.main.temp_min);
    document.querySelector('.maxTemp').textContent = 'High: ';
    document.querySelector('.h').textContent = tempKtoF(wData.main.temp_max);
    document.querySelector('.tDate').textContent = new Date().toDateString();
    document.querySelector('.tNow').textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    //document.querySelector('.wind').textContent = weatherInfo.wind.speed + 'm/s';
}

function displayWeather() {
    loadingWeather();

    getWeatherData()
        .then (weatherInfo => {
        hideLoading();
        showCurrentWeather(weatherInfo);
        }).catch(() => {
            document.querySelector('.err').textContent = 'Oops, location not found';
        })

    document.querySelector('#location').value = '';
}
    
const searchBtn = document.querySelector('#searchBtn');
searchBtn.addEventListener('click', displayWeather);

function tempFtoC() {
    const tempFs = document.querySelectorAll('.temp');
    console.log(tempFs);
    tempFs.forEach(temp => {
        const tempFNumber = temp.textContent.split(' ')[0];
        const tempC = Math.round((tempFNumber - 32)*5/9);
        temp.textContent = tempC + ' °C';
    });
    document.querySelector('.convertTemp').textContent = 'Display °F';
}
function tempCtoF() {
    const tempCs = document.querySelectorAll('.temp');
    console.log(tempCs);
    tempCs.forEach(t => {
        const tempCNumber = t.textContent.split(' ')[0];
        const tempF = Math.round(tempCNumber*9/5 + 32);
        t.textContent = tempF + ' °F'
    });
    document.querySelector('.convertTemp').textContent = 'Display °C';
}
const convertTemp = document.querySelector('.convertTemp');
let counter = 0;
convertTemp.addEventListener('click', () => {
    counter +=1;
    if (counter === 1) {
        tempFtoC();
    } else if (counter === 2) {
        tempCtoF();
        return counter = 0;
    }; 
});