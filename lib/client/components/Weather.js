'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tools = require('./utils/tools');

var _tools2 = _interopRequireDefault(_tools);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // Helper to build class names with dynamic data


var CacheInMiliseconds = 1000 * 60 * 5;

var cities = [];
var citiesWeather = []; // API cache
var currentCity = 0;
var antipodeCity = 1;
var geoLocation = void 0;

var searchLocation = '/api/searchLocation';
var searchWeatherApi = '/api/searchWeather/';

var Weather = function (_React$Component) {
    _inherits(Weather, _React$Component);

    // Init data for UI
    function Weather(props) {
        _classCallCheck(this, Weather);

        var _this = _possibleConstructorReturn(this, (Weather.__proto__ || Object.getPrototypeOf(Weather)).call(this, props));

        _this.state = {
            weather: '',
            temp: 0,
            humidity: 0,
            wind: 0,
            antipode_weather: '',
            antipode_temp: 0,
            antipode_humidity: 0,
            antipode_wind: 0
        };
        return _this;
    }

    // Called before the render method is executed


    _createClass(Weather, [{
        key: 'componentWillMount',
        value: async function componentWillMount() {

            cities[currentCity] = { city: "Getting weather info..." };
            cities[antipodeCity] = { city: "Getting weather info..." };

            // Create a timer to clear the cache after 5 minutes, so we can get updated data from the API
            setInterval(function () {
                citiesWeather = []; // Empty the cache
                geoLocation = null;
            }, CacheInMiliseconds);

            await this.fetchData();
        }
    }, {
        key: 'fetchLocation',
        value: async function fetchLocation() {

            if ((0, _util.isNullOrUndefined)(geoLocation)) {
                var res = await fetch(searchLocation);
                var json = await res.json();
                geoLocation = json;
            }

            cities[currentCity] = { city: geoLocation.city, lat: geoLocation.latitude, lon: geoLocation.longitude }; // Set current location    
            cities[antipodeCity] = { city: '', lat: geoLocation.antipode_latitude, lon: geoLocation.antipode_longitude }; //Set antipode location
        }
    }, {
        key: 'fetchData',
        value: async function fetchData() {

            // Get the data from the cache if possible
            if (citiesWeather[currentCity] && citiesWeather[antipodeCity]) {
                this.updateData();
            } else {

                await this.fetchLocation();

                // Request new data to the API
                var res = await fetch(searchWeatherApi + cities[currentCity].city);
                citiesWeather[currentCity] = await res.json();

                var res2 = await fetch('' + searchWeatherApi + cities[antipodeCity].lat + '/' + cities[antipodeCity].lon);
                citiesWeather[antipodeCity] = await res2.json();
                cities[antipodeCity].city = citiesWeather[antipodeCity].name;

                this.updateData();
            }
        }
    }, {
        key: 'updateData',
        value: function updateData() {

            if (citiesWeather[currentCity]) {
                // Update the data for the UI
                this.setState({
                    weather: citiesWeather[currentCity].weather[0].id,
                    temp: Math.round(citiesWeather[currentCity].main.temp - 273.15), // Kelvin to Celcius
                    humidity: Math.round(citiesWeather[currentCity].main.humidity),
                    wind: Math.round(citiesWeather[currentCity].wind.speed)
                });
            }
            if (citiesWeather[antipodeCity]) {
                // Update the data for the UI
                this.setState({
                    antipode_weather: citiesWeather[antipodeCity].weather[0].id,
                    antipode_temp: Math.round(citiesWeather[antipodeCity].main.temp - 273.15), // Kelvin to Celcius
                    antipode_humidity: Math.round(citiesWeather[antipodeCity].main.humidity),
                    antipode_wind: Math.round(citiesWeather[antipodeCity].wind.speed)
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {

            // Build class names with dynamic data
            var weatherClass = (0, _classnames2.default)('wi wi-owm-' + this.state.weather);
            var antipode_weatherClass = (0, _classnames2.default)('wi wi-owm-' + this.state.antipode_weather);
            var bgColorClass = _tools2.default.setBgColorClass(this.state.temp);
            var antipode_bgColorClass = _tools2.default.setBgColorClass(this.state.antipode_temp);

            // Render the DOM elements
            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'div',
                    { className: bgColorClass },
                    _react2.default.createElement(
                        'h1',
                        { className: 'city' },
                        'Current city:'
                    ),
                    _react2.default.createElement(
                        'h1',
                        { className: 'city' },
                        cities[currentCity].city
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'weather' },
                        _react2.default.createElement('i', { className: weatherClass })
                    ),
                    _react2.default.createElement(
                        'section',
                        { className: 'weather-details' },
                        _react2.default.createElement(
                            'div',
                            { className: 'temp' },
                            _react2.default.createElement(
                                'span',
                                { className: 'temp-number' },
                                this.state.temp
                            ),
                            _react2.default.createElement('span', { className: 'wi wi-degrees' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'humidity' },
                            _react2.default.createElement('i', { className: 'wi wi-raindrop' }),
                            this.state.humidity,
                            ' %'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'wind' },
                            _react2.default.createElement('i', { className: 'wi wi-small-craft-advisory' }),
                            this.state.wind,
                            ' ',
                            _react2.default.createElement(
                                'span',
                                { className: 'vel' },
                                'Km/h'
                            )
                        )
                    )
                ),
                _react2.default.createElement(
                    'div',
                    { className: antipode_bgColorClass },
                    _react2.default.createElement(
                        'h1',
                        { className: 'city' },
                        'Antipode city:'
                    ),
                    _react2.default.createElement(
                        'h1',
                        { className: 'city' },
                        cities[antipodeCity].city
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'weather' },
                        _react2.default.createElement('i', { className: antipode_weatherClass })
                    ),
                    _react2.default.createElement(
                        'section',
                        { className: 'weather-details' },
                        _react2.default.createElement(
                            'div',
                            { className: 'temp' },
                            _react2.default.createElement(
                                'span',
                                { className: 'temp-number' },
                                this.state.antipode_temp
                            ),
                            _react2.default.createElement('span', { className: 'wi wi-degrees' })
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'humidity' },
                            _react2.default.createElement('i', { className: 'wi wi-raindrop' }),
                            this.state.antipode_humidity,
                            ' %'
                        ),
                        _react2.default.createElement(
                            'div',
                            { className: 'wind' },
                            _react2.default.createElement('i', { className: 'wi wi-small-craft-advisory' }),
                            this.state.antipode_wind,
                            ' ',
                            _react2.default.createElement(
                                'span',
                                { className: 'vel' },
                                'Km/h'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return Weather;
}(_react2.default.Component);

;

exports.default = Weather;