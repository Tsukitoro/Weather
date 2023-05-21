function saveDefaultCity(cityName) {
    localStorage.setItem('defaultCity', cityName);
    const target = document.getElementById('cityName');
    target.setAttribute('value', cityName);
}

export {saveDefaultCity};