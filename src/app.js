const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Definir partes para a configuracao do Express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather APP!',
        name: 'Nikael'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Nikael'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "AQUI E A PAGINA DE AJUDA",
        name: "Nikael"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ "Error": "Nao foi possivel acessar este endereco" })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, local } = {}) => {
            if (error) {
                return res.send(error)
            }
            forecast(latitude, longitude, (error, { temperatura, umidade } = {}) => {
                if (error) {
                    return res.send(error)
                }
                res.send({
                    forecast: 'A temperatura em ' + local + ' é de ' + temperatura + '˚C e a umidade do ar é de ' + umidade,
                    local,
                    address: req.query.address
                })
            })
        })
    }
    // if (!req.query.address) {
    //     return res.send({ "Error": "Houve um erro" })
    // } else {
    //     const endereco = req.query.address
    //     res.send({
    //         forecast: 'It is snowing',
    //         location: 'Philadelphia',
    //         address: endereco
    //     })
    // }
})



app.get('/products', (req, res) => {
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        msgError: 'Help article not found',
        name: "Nikael"
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        msgError: 'Page not found',
        name: 'Nikael'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
