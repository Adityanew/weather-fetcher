
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geo')
const forecast = require('./utils/forecast')



const app = express()
// define paths for express config

const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//Setup handle bar engines and views location

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
// setup static directory to serve

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => { 
    res.render('index', {
        title: 'Weather app server',
        name: 'Aditya'
    })
})

app.get('/about', (req, res) =>
{
    res.render('about', {
        title: 'this is the about page',
        name: 'Aditya Kumar Tomer'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'This is the help page',
        name: 'Aditya'
    })
})
app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: " please provide an address of the place for which the weather is to be searched"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({
                error: error
            })
        }
            forecast(latitude, longitude, (error, data) => {
                if(error) {
                    return res.send({
                        error: error
                    })
                }

                res.send({
                    location: location,
                    weatherInfo: data
                })
            })
        
    })
   
})

app.get('/products', (req, res) => {

    if(!req.query.search){
        return res.send (
            {
                error : 'search param needs to be provided'
            }
        )
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Aditya kr',
        errorMessage: 'Help article not found'
    })
})
app.get('*' , (req, res) => {

    res.render('404', {
        title: '404',
        name: 'Aditya kr',
        errorMessage: 'Page Not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})