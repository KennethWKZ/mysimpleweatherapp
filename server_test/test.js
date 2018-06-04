var dotenv = require('dotenv');
dotenv.config();
process.env.NODE_ENV = 'test';
process.env.PORT = 5000;

var sinon = require('sinon');
var chai = require('chai');
var chaiHttp = require('chai-http');
var path = require('path');
var server = require('./../src/server/index');
var IpTools = require(path.resolve(__dirname, './../src/server/utils/ip'));
var MCache = require(path.resolve(__dirname, './../src/server/utils/cache'));
var AntipodeTools = require(path.resolve(__dirname, './../src/server/utils/antipode'));
var should = chai.should();
var expect = chai.expect;


chai.use(chaiHttp);

var ipAddress;

describe("Routes", function() {
  describe("GET weather info by city", function() {

    it('it should GET London weather info', (done) => {
      chai.request(server)
          .get('/api/searchWeather/London')
          .end((err, res) => {
              res.status.should.be.equal(200);
              res.body.should.be.a('object');
              res.body.should.have.property('weather');
              res.body.should.have.property('main');
              res.body.should.have.property('wind');
              res.body.should.have.property('name').eql('London');
            done();
          });
    });

    it('it should GET 404 city not found', (done) => {
      chai.request(server)
          .get('/api/searchWeather/test')
          .end((err, res) => {
              res.status.should.be.equal(404);
              res.body.should.be.a('object');
              res.body.should.have.property('cod').eql('404');
              res.body.should.have.property('message').eql('city not found');
            done();
          });
    });
  });

  describe("GET weather info by coordinate", function() {

    it('it should GET lat: 3.2251 lon: 101.6803 weather info', (done) => {
      chai.request(server)
          .get('/api/searchWeather/3.2251/101.6803')
          .end((err, res) => {
              res.status.should.be.equal(200);
              res.body.should.be.a('object');
              res.body.should.have.property('weather');
              res.body.should.have.property('main');
              res.body.should.have.property('wind');
              res.body.should.have.property('name').eql('Kepong');
              res.body.should.have.property('coord');
              res.body.coord.should.have.property('lat').eql(3.23);
              res.body.coord.should.have.property('lon').eql(101.68);
            done();
          });
    });

    it('it should GET 400 nothing to geocode or undefined is not a float', (done) => {
      chai.request(server)
          .get('/api/searchWeather/test/test')
          .end((err, res) => {
              res.status.should.be.equal(400);
              res.body.should.be.a('object');
              res.body.should.have.property('cod').eql('400');
              res.body.should.have.property('message');
              expect(res.body.message === 'undefined is not a float' || res.body.message === 'Nothing to geocode').to.equal(true);
            done();
          });
    });
  });

  describe("GET current location by ip address", function() {

    it('it should GET current location by ip address', (done) => { 

      IpTools.get().then((ip) => {
        ip.should.be.a('string');
        ipAddress = ip;
        done();
      });


      chai.request(server)
          .get('/api/searchLocation')
          .end((err, res) => {
              res.status.should.be.equal(200);
              res.body.should.be.a('object');
              res.body.should.have.property('ip').eql(ipAddress);
              res.body.should.have.property('city');
              res.body.should.have.property('latitude');
              res.body.should.have.property('longitude');
              res.body.should.have.property('antipode_latitude');
              res.body.should.have.property('antipode_longitude');
            done();
          });
    });

    it('it should GET location cache by ip address with correct antipode coordinate', (done) => { 

      chai.request(server)
          .get('/api/searchLocation')
          .end((err, res) => {
              var geoDataCache = MCache.get(ipAddress);
              res.status.should.be.equal(200);
              res.body.should.be.a('object');
              res.body.should.have.property('ip').eql(geoDataCache.ip);
              res.body.should.have.property('city').eql(geoDataCache.city);
              res.body.should.have.property('latitude').eql(geoDataCache.latitude);
              res.body.should.have.property('longitude').eql(geoDataCache.longitude);
              res.body.should.have.property('antipode_latitude').eql(geoDataCache.antipode_latitude);
              res.body.should.have.property('antipode_longitude').eql(geoDataCache.antipode_longitude);

              var antipodeData = AntipodeTools.setAntipodeCoordinate(geoDataCache.latitude, geoDataCache.longitude);
              geoDataCache.antipode_latitude.should.have.equal(antipodeData.antipode_lat);
              geoDataCache.antipode_longitude.should.have.equal(antipodeData.antipode_lon);
            done();
          });
    });
  });
});