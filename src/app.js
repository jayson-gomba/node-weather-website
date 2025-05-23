const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App Home',
        name: 'Jayson Gomba'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jayson Gomba'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jayson Gomba',
        helpText: 'This is the help page'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'No address has been provided'
        })
    }

    if(req.query.address){
        geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
            if(error){
                return res.send({ error })
            }
            forecast(latitude,longitude, (error, fdata) => {
                if(error){
                    return res.send({ error })
                }
                res.send({
                    forecast: fdata,
                    location,
                    address: req.query.address
                })
    
            })
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jayson Gomba',
        errorText: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jayson Gomba',
        errorText: 'Page not Found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port:', port)
})