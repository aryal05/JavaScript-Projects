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
            throw new Error(`City not found. HTTP status: ${response.status}`);
        }

        const data = await response.json();

        // Debugging: Log the response data
        console.log(data);

        // Update weather details
        document.getElementById("city").innerHTML = `${data.name} City:`;
        // document.getElementById("bold").innerHTML = data.name;
        document.getElementById("cityForcast").innerHTML = `${data.name} :`;
        document.getElementById("bold").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "&deg;c";
        document.getElementById("wind").innerHTML = data.wind.speed + " m/s";
        document.getElementById("humidity").innerHTML = data.main.humidity + "%";
        weatherDescription.innerHTML = data.weather[0].description;

        // Update weather icon
        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
            document.body.style.backgroundImage = "url('images/cloudsbg.jpg')";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/heavy-rain.png";
            document.body.style.backgroundImage = "url('images/rainbg.jpg')";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
            document.body.style.backgroundImage = "url('images/mistbg.jpg')";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
            // document.body.style.backgroundImage = "url('images/drizzlebg.jpg')";
        } else if (data.weather[0].main === "Haze") {
            weatherIcon.src = "images/fog.png";
            document.body.style.backgroundImage = "url('images/fogbg.jpg')";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear-sky.png";
            document.body.style.backgroundImage = "url('images/clearbg.jpg')";
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "images/snow.png";
            document.body.style.backgroundImage = "url('images/snowbg.jpg')";
        } else {
            weatherIcon.src = "images/default.png"; // Fallback
            document.body.style.backgroundImage = "url('images/defaultbg.jpg')";
        }
        
    } catch (error) {
        // Log the error to understand why it occurs
        console.error("Error fetching weather data:", error);

        // Only show an alert for specific cases
        if (error.message.includes("City not found")) {
            alert("City not found. Please check the city name.");
        } else {
            alert("An unexpected error occurred. Please try again.");
        }
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
