const fetch = require('node-fetch');
const rootUrl = 'http://api.ipstack.com/';
const accessKey = '?access_key=' + process.env.IPSTACKAPI;

module.exports = {
    get: async function(ipAddress) {
        try
        {
            let res = await fetch(rootUrl + ipAddress + accessKey);
            let result = await res.json();
            if (result.error)
                throw result;
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};