const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8c14500580d34c25863b7ab6590519c0&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Connecte-se a internet', undefined)
        } else if (body.error) {
            callback('Algum problema esta impedindo a execucao do programa', undefined)
        } else {
            callback(undefined, {
                temperatura: body.current.temperature,
                umidade: body.current.humidity,
                location: body.location.name
            })
        }
    })
}

module.exports = forecast
