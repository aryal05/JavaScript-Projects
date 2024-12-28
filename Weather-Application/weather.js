const apiKey = '30985cd12f34acf0f480fe9bb6ab0c7c';
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('btn');

async function weather(city) {
    try {
        const response = await fetch(url + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        document.getElementById("city").innerHTML = data.name;
        document.getElementById("cityName").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "&degc";
        document.getElementById("wind").innerHTML = data.wind.speed + "km/h";
    } catch (error) {
        alert("City not found or another error occurred.");
        console.error(error);
    }
}
searchButton.addEventListener('click', () => {
    const city = searchBox.value.trim();
    if (city) {
        weather(city);
        searchBox.value = ''
    } else {
        alert("Please enter a city name.");
    }

});
weather('Gorkha')