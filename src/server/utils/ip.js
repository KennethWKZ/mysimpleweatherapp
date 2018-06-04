'use strict';
const { promisify } = require('util');
const getIP = promisify(require('external-ip')({
    replace: true,
    services: ['http://icanhazip.com/', 'http://ident.me/'],
    timeout: 600,
    verbose: true
}));
 
module.exports = {
    get : async function() {
        try {
            let ipAddress = await getIP();
            return ipAddress;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
};