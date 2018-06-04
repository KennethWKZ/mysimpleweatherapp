"use strict";

var NodeCache = require("node-cache");
var myCache = new NodeCache();
var CacheInMiliseconds = 1000 * 60 * 5;

module.exports = {
    set: function set(cacheName, cacheObject) {
        try {
            var success = myCache.set(cacheName, cacheObject, CacheInMiliseconds);
            if (!success) throw new Error("Failed to store cache");
        } catch (err) {
            console.log(err);
        }
    },

    get: function get(cacheName) {
        try {
            var cacheObject = myCache.get(cacheName);
            if (cacheObject == undefined) throw new Error("Failed to store cache");else return cacheObject;
        } catch (err) {
            return null;
        }
    }
};