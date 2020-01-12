const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

// Define paths for Express config
const staticPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup path for static resources
app.use(express.static(staticPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Rodger Haughey'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rodger Haughey'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        message: 'Welcome to the Help page',
        name: 'Rodger Haughey'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({ error })            
        }

        forecast(longitude, latitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })

    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help! (404 Error)',
        message: 'Help article not found',
        name: 'Rodger Haughey'
    })
})

// 404 catch-all
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        message: 'Page not found',
        name: 'Rodger Haughey'
    })
})


/*  FIRE UP THE WEB SERVER */
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})