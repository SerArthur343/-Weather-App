// WEATHER APP





const weatherForm = document.querySelector(".weatherForm");
const card = document.querySelector(".card");
const apiKey = "b7874b11b2b84e1c3e790e775c935d66";
const B1 = document.querySelector(".B1");

weatherForm.addEventListener("submit", e => {
    e.preventDefault();
    getWeatherInfo();
});

async function getWeatherInfo() {
    
    const cityInput = document.querySelector(".cityInput").value.trim();

    try {

        if(cityInput === "") {
            displayError("Please Enter A City Name!");
            return;
        }

        card.innerHTML = "Loading...⏳";
        card.style.display = "flex";

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&lang=en&units=metric`);

        if(!response.ok) {
        throw new Error("Couldn't Find City!");
        }

        const data = await response.json();
        console.log(data);
        display(data);
        document.querySelector(".cityInput").value = "";
    }

    catch(error) {
        displayError(error.message);
    }    
}

function display(data) {

    card.innerHTML = "";
    card.style.display = "flex";

   

    const city = document.createElement("h1");
    city.textContent = data.name;
    city.classList.add("city");

    const temperature = document.createElement("p");
    temperature.textContent = data.main.temp.toFixed(1) + "°C";
    temperature.classList.add("temperature");

    const humidity = document.createElement("p");
    humidity.textContent = "Humidity: %" + data.main.humidity;
    humidity.classList.add("humidity");

    const emoji = document.createElement("p");
    emoji.textContent = getEmoji(data.weather[0].id);
    emoji.classList.add("emoji");

    const info = document.createElement("p");
    info.textContent = data.weather[0].description;
    info.classList.add("info");
    


    card.appendChild(city);

    card.appendChild(temperature);

    card.appendChild(humidity);

    card.appendChild(emoji);

    card.appendChild(info);
}

function displayError(message) {

    card.style.display = "flex";
    card.innerHTML = `<h1>${message}</h1>`
}

function getEmoji(weatherID) {

    if(weatherID >= 200 && weatherID < 300) {
        return "⛈️";
    }
    else if(weatherID >= 300 && weatherID < 400) {
        return "🌦️";
    }
    else if(weatherID >= 500 && weatherID < 600) {
        return "🌧️";
    }
    else if(weatherID >= 600 && weatherID < 700) {
        return "❄️";
    }
    else if(weatherID >= 700 && weatherID < 800) {
        return "🌫️";
    }
    else if(weatherID === 800) {
        return "☀️";
    }
    else if(weatherID > 800 && weatherID < 810) {
        return "☁️";
    }
    else {
        return "?";
    }
} 



