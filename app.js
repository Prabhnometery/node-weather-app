const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast =  require('./utils/forecast');


const app = express();
const port = process.env.PORT || 8000

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, 'templates/views');
const partialsPath = path.join(__dirname, 'templates/partials');

// Setup static directory to save
app.use(express.static(publicDirectoryPath));

// Setup Handlebars Engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.get('', (req,res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Prabh Singh'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Prabh Singh'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'For any Issues and Concerns, Please contact me at prabhsimran29@gmail.com ',
        name: 'Prabh Singh'
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    const address = req.query.address
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })

        })

    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Help 404 Page',
        name: 'Prabh Singh',
        message: 'You have reached to an invaild help page'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Prabh Singh',
        message: "You have reached to a Page which doesn't exist! Please select the page from the Link provided above"
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});

