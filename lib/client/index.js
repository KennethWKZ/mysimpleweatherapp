'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Weather = require('./components/Weather.jsx');

var _Weather2 = _interopRequireDefault(_Weather);

var _main = require('./sass/main.scss');

var _main2 = _interopRequireDefault(_main);

var _weatherIconsMin = require('../../bower_components/weather-icons/css/weather-icons.min.css');

var _weatherIconsMin2 = _interopRequireDefault(_weatherIconsMin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Assign the React component to a DOM element
_reactDom2.default.render(_react2.default.createElement(_Weather2.default, null), document.getElementById('root'));

// Views