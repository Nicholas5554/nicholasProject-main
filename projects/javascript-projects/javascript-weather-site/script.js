const key = '*';
const api = `https://api.weatherapi.com/v1/`;

const searchButton = document.getElementById('search-button');
const weatherInfo = document.getElementById('weather-info');
const weatherIcons = document.getElementById('weather-icons');
const location = document.getElementById('location');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const feelsLike = document.getElementById('feels-like');
const cloudRain = document.getElementById('cloud-rain');
const moon = document.getElementById('moon');
const sun = document.getElementById('sun');

const hideSun = () => {
    sun.style.visibility = 'hidden';
}

const hideMoon = () => {
    moon.style.visibility = 'hidden';
}

const hideCloudRain = () => {
    cloudRain.style.visibility = 'hidden';
}

const changeOfRain = false;

searchButton.addEventListener('click', () => {
    const city = document.getElementById('search-city').value;
    if (city) {
        searchCity(city);
        document.getElementById('search-city').value = '';
    } else {
        location.textContent = 'write a city name';
        hideSun();
        hideMoon();
        temperature.textContent = '';
        humidity.textContent = '';
        feelsLike.textContent = '';
        return;
    }
});

const searchCity = (city) => {
    const apiFull = `${api}current.json?key=${key}&q=${city}`;
    fetch(apiFull)
        .then(res => res.json())
        .then(info => {
            location.textContent = info.location.name;
            temperature.textContent = `${Math.round(info.current.temp_c)}°C`;
            humidity.textContent = `${Math.round(info.current.humidity)}% humidity`;
            feelsLike.textContent = `feels like ${Math.round(info.current.feelslike_c)}°C`;

            if (info.current.is_day) {
                sun.style.visibility = 'visible';
                hideMoon();
            } else {
                moon.style.visibility = 'visible';
                hideSun();
            }

            if (info.current.chance_of_rain >= 10) {
                cloudRain.style.visibility = 'visible';
                hideSun();
                hideMoon();
            } else {
                hideCloudRain();
            }
        })
        .catch(err => {
            hideSun();
            hideMoon();
            location.textContent = 'not a real city try again';
            temperature.textContent = '';
            humidity.textContent = '';
            feelsLike.textContent = '';
            console.log('typo error try again', err);
        });
};