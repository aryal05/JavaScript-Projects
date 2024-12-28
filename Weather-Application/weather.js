const apiKey = '30985cd12f34acf0f480fe9bb6ab0c7c';
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('btn');
const weatherIcon = document.getElementsByClassName('weather-icon')[0]; // Access the first element
const weatherDescription = document.getElementById('weather-description'); // Fixed selector

async function weather(city) {
    try {
        const response = await fetch(url + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Update weather details
        document.getElementById("city").innerHTML = `${data.name} City:`;
        document.getElementById("cityName").innerHTML = data.name;
        document.getElementById("cityForcast").innerHTML = `${data.name} :`;
        document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "&deg;c";
        document.getElementById("wind").innerHTML = data.wind.speed + " m/s";
        weatherDescription.innerHTML = data.weather[0].description;

        // Update weather icon based on condition
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
         else if (data.weather[0].main === "Haze") {
        weatherIcon.src = "images/haze.png";
    }
        
         else {
            weatherIcon.src = "images/default.png"; // Fallback for unhandled cases
        }
    } catch (error) {
        alert("City not found or another error occurred.");
        console.error(error);
    }
}

// Event listener for search button
searchButton.addEventListener('click', () => {
    const city = searchBox.value.trim();
    if (city) {
        weather(city);
        searchBox.value = '';
    } else {
        alert("Please enter a city name.");
    }
});

// Default weather display
weather('Gorkha');
