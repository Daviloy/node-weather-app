const request = require("request");

const timezone = (latitude, longtitude, callback) => {
    const timezoneURL = `http://api.timezonedb.com/v2.1/get-time-zone?key=OX6OGB5NVN2C&format=json&by=position&lat=${latitude}&lng=${longtitude}`;

    request({ url: timezoneURL, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to connect to timezone services", undefined);
        } else if (body.status === "FAILED") {
            callback("Unable to connect to timezone services", undefined);
        } else if (body.message) {
            callback("Unable to connect to timezone services", undefined);
        } else {
            callback(undefined, {
                time: body.formatted,
                zoneName: body.zoneName,
            });
        }
    });
};

module.exports = timezone;
