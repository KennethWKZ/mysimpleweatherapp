'use strict'

const express = require('express');
const router = express.Router();
const path = require('path');
const GeoApi = require(path.resolve(__dirname, './../api/geoApi'));
const IpTools = require(path.resolve(__dirname, './../utils/ip'));
const MCache = require(path.resolve(__dirname, './../utils/cache'));
const AntipodeTools = require(path.resolve(__dirname, './../utils/antipode'));

router.get('/searchLocation', async function(req, res) {
    console.log("**** GET /searchLocationByIpAddress ****");
    let ipAddress = "";
    let geoDataCache;
    try {
      ipAddress = await IpTools.get();
      geoDataCache = MCache.get(ipAddress);
      if (geoDataCache)
      {
        console.log('Success get from cache.');
        res.send(geoDataCache);
      }
      else
      {
        let geoData = await GeoApi.get(ipAddress);
        let antipodeData = AntipodeTools.setAntipodeCoordinate(geoData.latitude, geoData.longitude);
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