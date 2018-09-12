const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        'a': {
            demand: true,
            alias: 'address',
            string: true,
            desc: 'Address for the weather app',
            default: 'New Delhi, 110025'
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        weather.getweather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`The temperature is currently ${weatherResults.temperature} but it feels like ${weatherResults.apparentTemperature} with humidity levels of ${(weatherResults.humidity)*100}%.`);
            }
        });
    }
});












