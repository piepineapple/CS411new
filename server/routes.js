require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const querystring = require('querystring');

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

const client_id = process.env.SPOTIFY_CLIENT_ID;  // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;  // Your secret
const redirect_uri = 'http://localhost:5173/callback';  // Your redirect uri


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

// handles GET requests to start OAuth 
router.get('/login', function (req, res) {
    var scope = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
        }));
});


// handles the redirect from Spotify
router.get('/callback', function (req, res) {
    var code = req.query.code || null;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
    }).then(response => {
        if (response.status === 200) {
            var access_token = response.data.access_token,
                refresh_token = response.data.refresh_token;

            // Redirecting to another route or sending tokens to the frontend
            res.redirect('/#access_token=' + access_token);
        } else {
            res.send('Authentication failed.');
        }
    }).catch(error => {
        console.log('Error getting Tokens:', error);
        res.send('Error getting Tokens');
    });
});



module.exports = router;