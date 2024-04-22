require('dotenv').config();
const axios = require('axios');
const express = require('express');
const cors = require('cors');
const querystring = require('querystring');
const session = require('express-session');

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'], // Methods allowed for CORS
    credentials: true // / This allows cookies to be sent along with the request
};

app.use(cors(corsOptions));
app.use(express.json());

const router = express.Router();
router.use(cors(corsOptions));
router.use(express.json());

app.use(session({
    secret: 'your_secret_key', // Change this to a secret phrase
    resave: false,
    saveUninitialized: true,
    cookie: { secure: !true } // Set to true if using https
}));

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = 'http://localhost:5173/callback';

// holds the playlists by weather condition
const playlistsByWeather = {
    "Clear": "spotify:playlist:5usV2q1M8kCSAd8nxdov4e",
    "Clouds": "spotify:playlist:70CgUbf2RjYd5eqXYvObpT",
    "Rain": "spotify:playlist:47S4MBG0EEXwA0GdJUA4Ur",
    "Mist": "spotify:playlist:1J4J4ylYCRrB5eEYQoz7Rz",
};

router.get('/weather', async (req, res) => {
    const city = req.query.city; // access the city sent as a query
    if (!city) {
        return res.status(400).json({ error: 'City needed!' });
    }
    const apiKey = process.env.Weather_API; // access the API key
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const weatherResponse = await axios.get(URL);
        const condition = weatherResponse.data.weather[0].main;
        console.log('Conditions:', condition);

        const playlistId = playlistsByWeather[condition];

        if (!playlistId) {
            return res.status(404).json({ error: 'No playlist found for this weather condition.' });
        }

        const spotifyAccessToken = req.session.spotifyAccessToken;  // Retrieve from session
        if (!spotifyAccessToken) {
            return res.status(401).json({ error: 'Spotify access token is missing or expired.' });
        }

        const spotifyResponse = await getPlaylist(playlistId, spotifyAccessToken);
        res.json(spotifyResponse);

    } catch (error) {
        console.error('Error in Weather API or Spotify API:', error);
        res.status(500).json({ error: error.toString() });
    }
})

// handles GET requests to start OAuth 
router.get('/login', function (req, res) {
    var scope = 'user-read-private user-read-email';
    res.setHeader('Cache-Control', 'no-store');
    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
        }));
});


// handles the redirect from Spotify
router.get('/callback', async function (req, res) {
    var code = req.query.code || null;

    try {
        const response = await axios({
            method: 'post',
            url: 'https://accounts.spotify.com/api/token',
            data: querystring.stringify({
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64')
            },
        });

        const { access_token } = response.data;

        req.session.spotifyAccessToken = access_token;
        res.redirect('/#access_token=' + access_token);
    } catch (error) {
        console.error('Error in Spotify API:', error);
        res.status(500).json({ error: 'Failed to retrieve Spotify token' });
    }

});

async function getPlaylist(playlistId, accessToken) {

    if (!accessToken) {
        return res.status(401).json({ error: 'Spotify access token is missing or expired.' });
    }

    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    });

    if (response.status !== 200) {
        throw new Error('Failed to fetch playlist from Spotify.');
    }

    return response.data;
}

module.exports = router;

