const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");
const timezone = require("./utils/timezone.js");

const app = express();

const PORT = process.env.PORT || 3000;

// set up static directory path for express
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Search field cannot be empty",
        });
    } else {
        geocode(
            req.query.address,
            (error, { longtitude, latitude, location } = {}) => {
                if (error) {
                    return res.send({
                        error: error,
                    });
                } else {
                    forecast(
                        longtitude,
                        latitude,
                        (
                            error,
                            {
                                temperature,
                                cloudy,
                                humidity,
                                wind,
                                pressure,
                                description,
                                icon,
                                main,
                            }
                        ) => {
                            if (error) {
                                return res.send({
                                    error: error,
                                });
                            } else {
                                timezone(
                                    latitude,
                                    longtitude,
                                    (error, { time, zoneName } = {}) => {
                                        if (error) {
                                            return res.send({
                                                error: error,
                                            });
                                        } else {
                                            let weatherBG;

                                            if (main.includes("Cloud")) {
                                                weatherBG = "clouds.jpg";
                                            } else if (main.includes("Rain")) {
                                                weatherBG = "rain.jpg";
                                            } else {
                                                weatherBG = "grain.jpg";
                                            }

                                            return res.send({
                                                location,
                                                temperature,
                                                cloudy,
                                                humidity,
                                                wind,
                                                pressure,
                                                description,
                                                icon,
                                                time,
                                                zoneName,
                                                weatherBG,
                                            });
                                        }
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    }
});

app.listen(PORT, () => {
    console.log("Server is running on PORT: " + PORT);
});
