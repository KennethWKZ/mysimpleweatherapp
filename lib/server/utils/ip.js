'use strict';

var _require = require('util'),
    promisify = _require.promisify;

var getIP = promisify(require('external-ip')({
    replace: true,
    services: ['http://icanhazip.com/', 'http://ident.me/'],
    timeout: 600,
    verbose: true
}));

module.exports = {
    get: async function get() {
        try {
            var ipAddress = await getIP();
            return ipAddress;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};