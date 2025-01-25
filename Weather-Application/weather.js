const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('btn');
const weatherDescription = document.getElementById('weather-description');
const apiUrl = 'http://localhost/PHP/weather.php'; 

async function fetchWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?city=${city}`);
        const data = await response.json();

        if (data.error) {
            alert(data.error);
            return;
        }

        const weatherIcon = document.querySelector('.weather-icon');
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.icon_code}@4x.png`;
        weatherIcon.alt = data.description;

        document.getElementById("city").innerHTML = `${data.city} City:`;
        document.getElementById("cityForcast").innerHTML = `${data.city} :`;
        document.getElementById("bold").innerHTML = data.city;
        document.getElementById("temp").innerHTML = Math.round(data.temperature) + "&deg;c";
        document.getElementById("wind").innerHTML = data.wind_speed + " m/s";
        document.getElementById("direction").innerHTML = data.wind_direction + " degrees";
        document.getElementById("humidity").innerHTML = data.humidity + "%";
        document.getElementById("pressure").innerHTML = data.pressure + " hPa";
        weatherDescription.innerHTML = data.description;

        // Update background image based on weather
        const mainWeather = data.description.toLowerCase();

        if (mainWeather.includes("cloud")) {
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        } else if (mainWeather.includes("rain")) {
            document.body.style.backgroundImage = "url('https://st4.depositphotos.com/4876263/20564/i/450/depositphotos_205644092-stock-photo-heavy-rain-falls-road-which.jpg')";
        } else if (mainWeather.includes("mist")) {
            document.body.style.backgroundImage = "url('https://plus.unsplash.com/premium_photo-1669613233573-4911a0a81c63?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9yZXN0JTIwbWlzdHxlbnwwfHwwfHx8MA%3D%3D')";
        } else if (mainWeather.includes("drizzle")) {
            document.body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMW52awlZheuRgxcetXz2igHvStkdd3IPLxA&s')";
        } else if (mainWeather.includes("haze")) {
            document.body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Y_wFgqTOto5tLeyZFnak8FwpCiTs0sLZqg&s')";
        } else if (mainWeather.includes("clear")) {
            document.body.style.backgroundImage = "url('https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=')";
        } else if (mainWeather.includes("snow")) {
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1707688658001-4248125102ef?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c25vdyUyMGZvcmVzdHxlbnwwfHwwfHx8MA%3D%3D')";
        } else {
            document.body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Y_wFgqTOto5tLeyZFnak8FwpCiTs0sLZqg&s')";
        }
        
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An unexpected error occurred. Please try again.");
    }
}

searchButton.addEventListener('click', () => {
    const city = searchBox.value.trim();
    if (city) {
        fetchWeather(city);
        searchBox.value = '';
    } else {
        alert("Please enter a city name.");
    }
});

searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const city = searchBox.value.trim();
        if (city) {
            fetchWeather(city);
            searchBox.value = '';
        } else {
            alert("Please enter a city name.");
        }
    }
});

//default city (Gorkha)
fetchWeather('Gorkha');
