const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/384282c5538aa8537391899ca173d2f9/' + latitude + ',' + longitude
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain. Today will have a high temperature of ' + body.daily.data[0].apparentTemperatureHigh + ' degrees, with a low temperature of ' + body.daily.data[0].apparentTemperatureLow + ' degrees.')
        }
    })
}

module.exports = forecast