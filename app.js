const express = require('express');
const axios = require('axios');
const ejs = require('ejs');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

const apiKey = '67538c2e607fb6908de88263fa5b4dd2';

function getTemperatureClass(temperature) {
    if (temperature < 10) {
      return 'cold';
      console.log('cold');
    } else if (temperature >= 10 && temperature <= 20) {
      return 'moderate';
      console.log('moderate');
    } else {
      return 'hot';
      console.log('hot');
    }
  }
  


app.get('/', (req, res) => {
res.render('index', { weatherData: null, error: null, getTemperatureClass });
});

app.get('/weather', async (req, res) => {

    const location = req.query.location;
    if(!location) {
        return res.render('index', { weatherData: null, error: 'Inserisci una posizione corretta.' });

    }
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
        const weatherData = response.data;

        res.render('index', { weatherData, error: null, getTemperatureClass });
    } catch (error) {
        res.render('index', { weatherData: null, error: 'Errore durante la richiesta dei dati meteo.'});

    }
});

app.listen(port, () => {
    console.log('Server is running on port ${3000}');


});


