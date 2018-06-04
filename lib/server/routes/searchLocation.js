'use strict';

var express = require('express');
var router = express.Router();
var path = require('path');
var GeoApi = require(path.resolve(__dirname, './../api/geoApi'));
var IpTools = require(path.resolve(__dirname, './../utils/ip'));
var MCache = require(path.resolve(__dirname, './../utils/cache'));
var AntipodeTools = require(path.resolve(__dirname, './../utils/antipode'));

router.get('/searchLocation', async function (req, res) {
  console.log("**** GET /searchLocationByIpAddress ****");
  var ipAddress = "";
  var geoDataCache = void 0;
  try {
    ipAddress = await IpTools.get();
    geoDataCache = MCache.get(ipAddress);
    if (geoDataCache) {
      console.log('Success get from cache.');
      res.send(geoDataCache);
    } else {
      var geoData = await GeoApi.get(ipAddress);
      var antipodeData = AntipodeTools.setAntipodeCoordinate(geoData.latitude, geoData.longitude);
      geoData.antipode_latitude = antipodeData.antipode_lat;
      geoData.antipode_longitude = antipodeData.antipode_lon;
      MCache.set(ipAddress, geoData);
      res.send(geoData);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;