// import {saveDefaultCity} from './LocalSaver.js';
// import {getForecast} from "./forecast";

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function saveDefaultCityCookie(cityName) {
    let nameCookie = 'defaultCity';
    // let valueCookie = cityName;
    document.cookie = encodeURIComponent(nameCookie) + '=' + encodeURIComponent(cityName) + `; path=/; max-age=${10}`;
    // const target = document.getElementById('cityName');
    // target.setAttribute('value', cityName);
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    console.log(matches);
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

async function getMainCityInf(cityName) {
    const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = '305a0d4b0f32e7ec248cac16dabc5ec8';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const json = await response.json();
            console.log(json);
            gotNowWeather(cityName, json);
            gotDetails(cityName, json);
            getForecast();
            // saveDefaultCity(cityName);
            saveDefaultCityCookie(cityName);
            const target = document.getElementById('cityName');
            target.setAttribute('value', cityName);
        } else {
            throw new notFoundCity(`${cityName} not found!`);
            // alert(`${cityName} не нашёлся...`);
        }
    } catch (err) {
        alert(`${err.toString()}`);
    }
}

class notFoundCity extends Error {
    constructor(message) {
        super(message);
        this.name = "notFoundCity";
    }
}

class HttpErr extends Error {
    constructor(message) {
        super(message);
        this.name = "HttpError";
    }
}


function gotNowWeather(cityName, json) {
    const Temperature = document.getElementById('nowTemperature');
    Temperature.innerHTML = `<div><h1>${temperatureConverter(json.main.temp)}°</h1></div><div id="date">${new Date().getDate()} ${month[new Date().getMonth()]}</div>`;

    const Weather = document.getElementById('nowWeather');
    const picCode = json.weather[0].icon;
    Weather.innerHTML = `<img src=https://openweathermap.org/img/wn/${picCode}@4x.png>`;
    // Weather.innerHTML = `${json.weather[0].main}`;

    const city = document.getElementById('nowCity');
    city.innerHTML = `${cityName}`;
}

function gotDetails(cityName, json) {
   const target = document.getElementById('Details');
   const sunriseTime = new Date(json.sys.sunrise * 1000);
   const sunsetTime = new Date(json.sys.sunset * 1000);
   target.innerHTML = `
        <h3>${cityName}</h3>
        <p>Temperature: ${temperatureConverter(json.main.temp)}°</p>
        <p>Fells like: ${temperatureConverter(json.main.feels_like)}°</p>
        <p>Weather: ${json.weather[0].main}</p>
        <p>Sunrise: ${sunriseTime.getHours()}:${sunriseTime.getMinutes()}</p>
        <p>Sunset: ${sunsetTime.getHours()}:${sunsetTime.getMinutes()}</p>`
}

function temperatureConverter(celvinTemperature) {
    const actualTemperature = celvinTemperature - 273;
    return actualTemperature.toFixed(0);
}


// let getDefaultWeather = getCookie('defaultCity') ?? 'Moscow';
// // const defaultSaveCity = 'Moscow';
// if (getCookie('defaultCity') === undefined) {
    saveDefaultCityCookie(getCookie('defaultCity') ?? 'Nizhniy Novgorod');
// }
getMainCityInf(getCookie('defaultCity'));

async function getForecast() {
    const cityName = document.getElementById('nowCity').innerText;
    const serverUrl = 'https://api.openweathermap.org/data/2.5/forecast';
    const apiKey = '305a0d4b0f32e7ec248cac16dabc5ec8';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        if (response.ok) {
            const json = await response.json();
            console.log(json);
            createForecastList(json);
        } else {
            alert(`${cityName} не нашёлся...`);
        }
    } catch (err) {
        alert(`Ошибка HTTP: ${err.toString()}`);
    }
}

function createForecastList(json) {
    const mother = document.getElementById('Forecast');
    mother.innerHTML = `<h3>${document.getElementById('cityName').value}</h3>`;
    const forecastList = json.list.map(elem => {
        const date = new Date(elem.dt * 1000);
        const picCode = elem.weather[0].icon;
        const forecastTab = document.createElement('div');
        forecastTab.insertAdjacentHTML('afterbegin', `
            <div class="wrap justify-between">
                <div class="max-available" >
                    <div>${date.getDate()} ${month[date.getMonth()]}</div>
                    <div>Temperature: ${temperatureConverter(elem.main.temp)}°</div>
                    <div>Feels like: ${temperatureConverter(elem.main.feels_like)}°</div>
                </div>
                <img style="width: 50%; height" src=https://openweathermap.org/img/wn/${picCode}@4x.png>
                <div>
                    <div>${date.getHours()}:${date.getMinutes().toString().padStart(2,'0')}</div>
                </div>
            </div>
        `);

        return forecastTab;
    })
    forecastList.forEach(elem => {
        const target = document.getElementById('Forecast');
        target.insertAdjacentElement('beforeend', elem);
    })

}

