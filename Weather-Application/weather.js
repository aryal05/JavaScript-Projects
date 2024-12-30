const apiKey = '30985cd12f34acf0f480fe9bb6ab0c7c';
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchBox = document.getElementById('search-box');
const searchButton = document.getElementById('btn');
const weatherDescription = document.getElementById('weather-description');

function updateDateTime() {
    const now = new Date();
    const options = {
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',  
        hour12: true
    };
    const formattedDate = now.toLocaleDateString('en-US', options);
    document.getElementById('date').innerHTML = formattedDate;
}

updateDateTime();


setInterval(updateDateTime, 1000);


async function weather(city) {
    try {
        const response = await fetch(url + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`City not found. HTTP status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data);
        const iconCode = data.weather[0].icon; 
        const weatherIcon = document.querySelector('.weather-icon'); 
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        weatherIcon.alt = data.weather[0].description;
        
        document.getElementById("city").innerHTML = `${data.name} City:`;
        // document.getElementById("bold").innerHTML = data.name;
        document.getElementById("cityForcast").innerHTML = `${data.name} :`;
        document.getElementById("bold").innerHTML = data.name;
        document.getElementById("temp").innerHTML = Math.round(data.main.temp) + "&deg;c";
        document.getElementById("wind").innerHTML = data.wind.speed + " m/s";
        document.getElementById("direction").innerHTML = data.wind.deg + " degrees";
        document.getElementById("humidity").innerHTML = data.main.humidity + "%";
        document.getElementById("pressure").innerHTML = data.main.pressure + " hPa";
        weatherDescription.innerHTML = data.weather[0].description;

        // Update weather icon
        if (data.weather[0].main === "Clouds"){ 
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1509803874385-db7c23652552?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')";
        } else if (data.weather[0].main === "Rain") {
            document.body.style.backgroundImage = "url('https://st4.depositphotos.com/4876263/20564/i/450/depositphotos_205644092-stock-photo-heavy-rain-falls-road-which.jpg')";
        } else if (data.weather[0].main === "Mist") {
            document.body.style.backgroundImage = "url('https://plus.unsplash.com/premium_photo-1669613233573-4911a0a81c63?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9yZXN0JTIwbWlzdHxlbnwwfHwwfHx8MA%3D%3D')";
        } else if (data.weather[0].main === "Drizzle") {
            document.body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMW52awlZheuRgxcetXz2igHvStkdd3IPLxA&s')";
        } else if (data.weather[0].main === "Haze") {
            document.body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Y_wFgqTOto5tLeyZFnak8FwpCiTs0sLZqg&s')";
        } else if (data.weather[0].main === "Clear") {
            document.body.style.backgroundImage = "url('https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=')";
        } else if (data.weather[0].main === "Snow") {
            document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1707688658001-4248125102ef?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c25vdyUyMGZvcmVzdHxlbnwwfHwwfHx8MA%3D%3D')";
        } else { 
            document.body.style.backgroundImage = "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9Y_wFgqTOto5tLeyZFnak8FwpCiTs0sLZqg&s')";
        }
        
    } catch (error) {
        console.error("Error fetching weather data:", error);
        if (error.message.includes("City not found")) {
            alert("City not found. Please check the city name.");
        } else {
            alert("An unexpected error occurred. Please try again.");
        }
    }
}

searchButton.addEventListener('click', () => {
  handleSearch()
});
searchBox.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleSearch();
    }
});


const handleSearch = () => {
const city = searchBox.value.trim();
if (city) {
    weather(city);
    searchBox.value = '';
} else {
    alert("Please enter a city name.");
}
}

// Default weather 
weather('Gorkha');
