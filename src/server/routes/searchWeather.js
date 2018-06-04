'use strict'

const express = require('express');
const router = express.Router();
const path = require('path');
const WeatherApi = require(path.resolve(__dirname, './../api/weatherApi'));

router.get('/searchWeather/:city', async function(req, res) {
    console.log("**** GET /searchWeatherByCity ****");
    try {
      let weatherData = await WeatherApi.getByCity(req.params.city);
      console.log(`Success get weather info for ${req.params.city}`)
      res.send(weatherData);
    } catch (err) {
      res.status(err.cod).json(err);
    }
  });

router.get('/searchWeather/:lat/:lon', async function(req, res) {
    console.log("**** GET /searchWeatherByCoordinate ****");
    try {
      let weatherData = await WeatherApi.getByCoordinate(req.params.lat, req.params.lon);
      console.log(`Success get weather info for [${req.params.lat}, ${req.params.lon}]`)
      res.send(weatherData);
    } catch (err) {
      res.status(err.cod).json(err);
    }
  });

module.exports = router;