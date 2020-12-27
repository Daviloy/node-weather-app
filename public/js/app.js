const app = document.querySelector(".App");

const locationDetails = document.querySelector(".location-details");
const errorMsg = document.querySelector("#error-message");
const searchForm = document.querySelector("#search-form");
const popularCities = document.querySelectorAll(".popular-locations-items li");

const temperature = document.querySelector("#temperature");
const city = document.querySelector(".location-city");
const time = document.querySelector(".location-time");

const addressUI = document.querySelector("#address");

const cloudy = document.querySelector("#cloudy");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const pressure = document.querySelector("#pressure");

const description = document.querySelector("#description");
const zoneName = document.querySelector("#zone-name");

const weatherIcon = document.querySelector("#weather-icon");

const overlay = document.querySelector(".overlay");

window.onload = function () {
    fetchWeatherData("lagos");

    popularCities.forEach((city) => getCityTemp(city));
};

function getCityTemp(city) {
    fetch("http://localhost:3000/weather?address=" + city.textContent)
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                locationDetails.style.display = "none";
                errorMsg.textContent = data.error;
                errorMsg.style.display = "block";
            } else {
                city.querySelector(
                    ".city-temp"
                ).innerHTML = `${data.temperature}&#176;C`;
            }
        });
}

searchForm.addEventListener("submit", searchLocation);

function searchLocation(event) {
    // prevent form default behaviour
    event.preventDefault();

    const searchInput = document.querySelector("#search-input");

    const address = searchInput.value;

    fetchWeatherData(address);

    searchInput.value = "";

    popularCities.forEach((city) => getCityTemp(city));
}

popularCities.forEach((city) => {
    city.addEventListener("click", getCityData);
});

function getCityData(event) {
    // scroll to top
    window.scrollTo(0, 0);

    popularCities.forEach((city) => getCityTemp(city));

    const wrongAddress = event.target.textContent;

    const address = wrongAddress.split(" ").shift();

    fetchWeatherData(address);
}

function fetchWeatherData(address) {
    overlay.style.display = "flex";

    fetch("http://localhost:3000/weather?address=" + address)
        .then((response) => response.json())
        .then((data) => {
            overlay.style.display = "none";

            if (data.error) {
                locationDetails.style.display = "none";
                errorMsg.textContent = data.error;
                errorMsg.style.display = "block";
            } else {
                console.log(data);
                locationDetails.style.display = "flex";
                errorMsg.style.display = "none";

                app.style.backgroundImage = `url(../img/${data.weatherBG})`;

                temperature.textContent = data.temperature;
                city.textContent = data.location;
                time.textContent = data.time;

                addressUI.textContent = address;

                description.textContent = data.description;
                zoneName.textContent = data.zoneName
                    ? data.zoneName
                    : "Unavailable";

                cloudy.textContent = `${data.cloudy}%`;
                humidity.textContent = `${data.humidity}%`;
                wind.textContent = `${data.wind}km/hr`;
                pressure.textContent = `${data.pressure}Pa`;

                weatherIcon.src = `http://openweathermap.org/img/w/${data.icon}.png`;
                weatherIcon.alt = "";
            }
        })
        .catch((error) => {
            console.log(error);
        });
}
