'use strict';

var fetch = require('node-fetch');
var rootUrl = 'http://api.openweathermap.org/data/2.5/weather';
var cityApiUrl = '?q=';
var coorApiUrl = '?lat={lat}&lon={lon}';
var apiKey = '&appid=' + process.env.OPENWEATHERAPI;

module.exports = {
    getByCity: async function getByCity(place) {
        try {
            var fullUrl = rootUrl + cityApiUrl + place + apiKey;
            console.log(fullUrl);
            var res = await fetch(fullUrl);
            var result = await res.json();
            if (result.cod !== 200) throw result;
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    getByCoordinate: async function getByCoordinate(lat, lon) {
        try {
            var fullUrl = rootUrl + coorApiUrl.replace('{lat}', lat).replace('{lon}', lon) + apiKey;
            console.log(fullUrl);
            var res = await fetch(fullUrl);
            var result = await res.json();
            if (result.cod !== 200) throw result;
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};