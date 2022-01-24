const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibmlrYWVsIiwiYSI6ImNreWx3czU3MjBmcmcycG1mem45dGtuYXUifQ.usmK0VJqEweDiWlY6jHkmQ'

    request({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Voce nao tem uma conexao com a internet', undefined)
        } else if (body.features === 0) {
            callback('Algum erro esta acontecendo', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                local: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode


