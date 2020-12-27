const request = require("request");

const forecast = (longtitude, latitude, callback) => {
    const forecastURL =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        encodeURIComponent(latitude) +
        "&lon=" +
        encodeURIComponent(longtitude) +
        "&units=metric&appid=dd231fc73460cff09dded3dde15fd6a8";

    request({ url: forecastURL, json: true }, (error, { body } = {}) => {
        const {
            temp,
            clouds,
            humidity,
            wind_speed,
            pressure,
            weather,
        } = body.current;

        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            callback(undefined, {
                temperature: temp,
                cloudy: clouds,
                humidity: humidity,
                wind: wind_speed,
                pressure: pressure,
                description: weather[0].description,
                icon: weather[0].icon,
                main: weather[0].main,
            });
        }
    });
};

module.exports = forecast;
