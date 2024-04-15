const express = require('express');
require('dotenv').config();
//const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();
const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send("hello");
});

//mongoose.connect(process.env.MONGODB_URI, {
//    useNewUrlParser: true,
//    useUnifiedTopology: true,
//})

//    .then(() => console.log('Connected to MongoDB'))
//    .catch((err) => console.error('Could not connect to MongoDB:', err));

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server running at <http://localhost>:${port}
`);
});

