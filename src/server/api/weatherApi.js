const fetch = require('node-fetch');
const rootUrl = 'http://api.openweathermap.org/data/2.5/weather';
const cityApiUrl = '?q=';
const coorApiUrl = '?lat={lat}&lon={lon}';
const apiKey = '&appid=' + process.env.OPENWEATHERAPI;

module.exports = {
    getByCity: async function(place) {
        try
        {
            let fullUrl = (rootUrl + cityApiUrl + place + apiKey);
            console.log(fullUrl);
            let res = await fetch(fullUrl);
            let result = await res.json();
            if (result.cod !== 200)
                throw result;
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    },

    getByCoordinate: async function(lat, lon) {
        try
        {
            let fullUrl = (rootUrl + coorApiUrl.replace('{lat}', lat).replace('{lon}', lon) + apiKey);
            console.log(fullUrl);
            let res = await fetch(fullUrl);
            let result = await res.json();
            if (result.cod !== 200)
                throw result;
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};