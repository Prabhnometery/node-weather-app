const request =  require('request');


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicHJhYmhzaW1yYW4yOSIsImEiOiJja2lubXFlOXExNHNpMnJxajRsMHRndXZqIn0.HHyq4JaoNVsIWEd98B-XDg&limit=1';
    // request is an async function so we need to use callback here 
    request({ url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Please try another search', undefined)
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }

    })
}

module.exports = geocode;
