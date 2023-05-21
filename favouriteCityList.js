const favouritesCitys = localStorage.getItem('favouriteList');
let cityList = new Set();
if (favouritesCitys) {
    cityList = new Set([
        ...JSON.parse(favouritesCitys)
    ]);
}



function renderCityList(){
    const oldCityList = document.getElementById('favouriteCityList');

    oldCityList.remove();

    const newCityList = document.createElement('div');

    newCityList.setAttribute('id', 'favouriteCityList');
    newCityList.setAttribute('style', 'overflow: auto; height: 500px');

    const target = document.getElementById('favouriteListContainer');

    target.insertAdjacentElement('beforeend', newCityList);

    // for (const [city] of cityList.entries()) {
    //     renderFavouriteCity(city)
    // }

    recursRenderFavCityList();
}

let setCount = 0;
function recursRenderFavCityList() {
    if (setCount === cityList.size) {
        setCount = 0;
        return;
    }
    setCount++;
    let arrCityList = Array.from(cityList);
    renderFavouriteCity(arrCityList[setCount-1]);
    recursRenderFavCityList();
}

function addFavouriteCity() {
    cityList.add(document.getElementById('nowCity').innerText);
    const array = [...cityList.values()];
    const json = JSON.stringify(array);
    localStorage.setItem('favouriteList', json);
    renderCityList();
}

function AddFavouriteCity() {
    this.cityName = `${document.getElementById('nowCity').innerText}`;
    cityList.add(this.cityName);
    const array = [...cityList.values()];
    const json = JSON.stringify(array);
    localStorage.setItem('favouriteList', json);
    renderCityList();
}

function renderFavouriteCity(city) {
    const newCityContainer = document.createElement('div');
    newCityContainer.setAttribute('class', 'wrap justify-between');
    newCityContainer.setAttribute('style', 'width: 100%');

    const selectCity = document.createElement('button');
    selectCity.setAttribute('id', `select-${city}`);
    selectCity.setAttribute('class', 'button-not-border');
    selectCity.innerHTML = city;
    selectCity.addEventListener('click',() => getMainCityInf(city));

    const deleteCity = document.createElement('button');
    deleteCity.setAttribute('id', `del-${city}`);
    deleteCity.innerHTML = 'X';
    deleteCity.addEventListener('click',() => deleteFavouriteCity(city));

    const target = document.getElementById('favouriteCityList');
    newCityContainer.insertAdjacentElement('beforeend', deleteCity);
    newCityContainer.insertAdjacentElement('afterbegin', selectCity);

    target.insertAdjacentElement('beforeend', newCityContainer);
}

function deleteFavouriteCity(cityName) {
    cityList.delete(cityName);
    localStorage.clear();
    const array = [...cityList.values()];
    const json = JSON.stringify(array);
    localStorage.setItem('favouriteList', json);
    renderCityList();
}


