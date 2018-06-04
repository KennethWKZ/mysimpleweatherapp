const NodeCache = require( "node-cache" );
const myCache = new NodeCache();
const CacheInMiliseconds = 1000*60*5;

module.exports = {
    set: function(cacheName, cacheObject) {
        try
        {
            let success = myCache.set(cacheName, cacheObject, CacheInMiliseconds);
            if (!success)
                throw new Error("Failed to store cache");
        } catch (err) {
            console.log(err);
        }
    },

    get: function(cacheName) {
        try
        {
            let cacheObject = myCache.get(cacheName);
            if (cacheObject == undefined)
                throw new Error("Failed to store cache");
            else
                return cacheObject;
        } catch (err) {
            return null;
        }
    }
};