const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a2b174d61667b36bf2b3a4dfc0250bdc&query=' + latitude + ',' + longitude + '&units=m';
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the weather service!!', undefined)
        } else if (body.success === false) {
            callback('Unable to find the location! Kindly check the latitute and longitude passed.', undefined)
        } else {
            const temp = body.current.temperature
            const feelsLike = body.current.feelslike
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + temp + ' degrees out. It feels like ' + feelsLike + ' degrees out!' )
        }
    })
}

module.exports = forecast;
