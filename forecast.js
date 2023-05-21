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
    const forecastList = json.list.map(elem => {
        const date = new Date(elem.dt *1000);
        const forecastTab = document.createElement('div');
        forecastTab.insertAdjacentHTML('afterbegin', `
            <div class="wrap justify-between">
                <div class="max-available" >
                    <div class="w-50">
                        <div>${date.getDate()}.${date.getMonth()+1}</div>
                        <div>Temperature: ${13}°</div>
                        <div>Feels like: ${10}°</div>
                    </div>
                </div>
                <div class="max-available">
                    <div class="w-50">
                        <div>Time</div>
                        <div>weather</div>
                    </div>
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

export {getForecast};