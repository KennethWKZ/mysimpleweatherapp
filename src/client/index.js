import React from 'react';
import ReactDOM from 'react-dom';

// Views
import Weather from './components/Weather.jsx';

import styles from './sass/main.scss';
import styles2 from '../../bower_components/weather-icons/css/weather-icons.min.css';

// Assign the React component to a DOM element
ReactDOM.render(<Weather />, document.getElementById('root'));
