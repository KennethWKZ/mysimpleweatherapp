'use strict';

var fetch = require('node-fetch');
var rootUrl = 'http://api.ipstack.com/';
var accessKey = '?access_key=' + process.env.IPSTACKAPI;

module.exports = {
    get: async function get(ipAddress) {
        try {
            var res = await fetch(rootUrl + ipAddress + accessKey);
            var result = await res.json();
            if (result.error) throw result;
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};