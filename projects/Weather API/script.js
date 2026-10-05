const apiKey = "637357c6e2ec43f6908212813262903";
const apiUrl = "https://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=";

const searchInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city);

        if (!response.ok) {
            alert("City not found. Please try again.");
            return;
        }

        const data = await response.json();

        document.querySelector(".city").textContent = data.location.name;
        document.querySelector(".temp").textContent = Math.round(data.current.temp_c) + "°C";
        document.querySelector(".humidity").textContent = data.current.humidity + "%";
        document.querySelector(".wind").textContent = data.current.wind_kph + " km/h";

        weatherIcon.src = "https:" + data.current.condition.icon;
        weatherIcon.style.width = "100px";

    } catch (error) {
        alert("Something went wrong. Please try again.");
    }
}

searchBtn.addEventListener("click", () => {
    if (searchInput.value.trim()) {
        checkWeather(searchInput.value.trim());
    }
});

searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && searchInput.value.trim()) {
        checkWeather(searchInput.value.trim());
    }
});


checkWeather("Cairo");