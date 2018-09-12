const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        'a': {
            demand: true,
            alias: 'address',
            string: true,
            desc: 'Address for the weather app',
            default: 'Delhi, 110025'
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);

var geoCodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geoCodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find address');
    }

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherURL = `https://api.darksky.net/forecast/7720d7995ac7ded69b55bd6c21a91894/${lat},${lng}`;

    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherURL);

}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    var humidity = response.data.currently.humidity;

    console.log(`The temperature is currently ${temperature} but it feels like ${apparentTemperature} with humidity levels of ${(humidity)*100}%.`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers');
    } else {
        console.log(e.message);
    }
});
