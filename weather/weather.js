const request = require('request');

var getweather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/7720d7995ac7ded69b55bd6c21a91894/${lat},${lng}`,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                humidity: body.currently.humidity
            })
        } else {
            callback('Unable to fetch weather');
        }
    });
};

module.exports = {
    getweather
};
