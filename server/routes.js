require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'], // Methods allowed for CORS
    credentials: true // / This allows cookies to be sent along with the request
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

const journal = require('./models/journal');
const router = express.Router();
router.use(cors(corsOptions));
router.use(express.json());


router.get('/weather', (req, res) => { //switched app.get to router.get
    const city = req.query.city; // access the city sent as a query
    if (!city) {
        return res.status(400).json({ error: 'City needed!' });
    }
    const apiKey = process.env.Weather_API; // access the API key
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    axios.get(URL)
        .then((response) => {
            // obtain only the main weather conditions from the call
            const condition = response.data.weather[0].main;
            console.log('Conditions:', condition);
        })
        .catch(error => res.status(500).json({ error: error.toString() }));
})


// fetch weather data for a city
function fetchWeather(city) {
    const apiKey = process.env.Weather_API; // access the API key
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    axios.get(URL)
        .then((response) => {
            // obtain only the main weather conditions from the call
            const condition = response.data.weather[0].main;
            // console.log('Conditions:', condition);
        })
        .catch((error) => {
            console.error('Error fetching the data:', error);
        });
}



router.get('/hn-stories', async (req, res) => {
    // Implementation for fetching stories from Hacker News API
});

router.post('/save-story', async (req, res) => {
    // Implementation for saving a story to MongoDB
});

module.exports = router;