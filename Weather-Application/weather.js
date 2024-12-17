const apiKey = "173c734987574c9bc327964b5e39b4e0";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?uints=metric&q=London"

async function checkWeather() {
    const response = await fetch(apiUrl + `&appid=${apiKey}`)
    var data = await response.json()
    console.log(data)
}
checkWeather()