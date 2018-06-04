const express = require('express');
const app = express();
const helmet = require('helmet');
const port = process.env.PORT || 3000;
const searchWeather = require('./routes/searchWeather');
const searchLocation = require('./routes/searchLocation');
app.use(helmet());
app.disable('x-powered-by');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname +'./../../')); //serves the index.html

app.use('/api', searchWeather, searchLocation);

app.listen(port, () => console.log(`Listening on port ${port}`));

//module.exports = app;