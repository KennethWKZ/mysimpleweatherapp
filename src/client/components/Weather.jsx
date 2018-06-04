import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames'; // Helper to build class names with dynamic data
import Tools from './utils/tools';
import { isNullOrUndefined } from 'util';

const CacheInMiliseconds = 1000*60*5;

let cities = [];
let citiesWeather = []; // API cache
let currentCity = 0;
let antipodeCity = 1;
let geoLocation;

const searchLocation = '/api/searchLocation';
const searchWeatherApi = '/api/searchWeather/';

class Weather extends React.Component {
    
    // Init data for UI
    constructor(props) {
        super(props);
        this.state = ({
            weather: '',
            temp: 0,
            humidity: 0,
            wind: 0,
            antipode_weather: '',
            antipode_temp: 0,
            antipode_humidity: 0,
            antipode_wind: 0
        })
    }
    
    // Called before the render method is executed
    async componentWillMount() {
        
        cities[currentCity] = { city: "Getting weather info..." }; 
        cities[antipodeCity] = { city: "Getting weather info..." };

        // Create a timer to clear the cache after 5 minutes, so we can get updated data from the API
        setInterval(function() {
            citiesWeather = []; // Empty the cache
            geoLocation = null;
        }, (CacheInMiliseconds));
    
        await this.fetchData();
    }

    async fetchLocation() {

        if (isNullOrUndefined(geoLocation))
        {
            let res = await fetch(searchLocation);
            let json = await res.json();
            geoLocation = json;
        }

        cities[currentCity] = { city: geoLocation.city, lat: geoLocation.latitude, lon: geoLocation.longitude }; // Set current location    
        cities[antipodeCity] = { city: '', lat: geoLocation.antipode_latitude, lon: geoLocation.antipode_longitude }; //Set antipode location
    }
    
    async fetchData() {

        // Get the data from the cache if possible
        if (citiesWeather[currentCity] && citiesWeather[antipodeCity]) {
            this.updateData();   
        }
        else {

            await this.fetchLocation();

            // Request new data to the API
            let res = await fetch(searchWeatherApi + cities[currentCity].city);
            citiesWeather[currentCity] = await res.json();
            
        
            let res2 = await fetch(`${searchWeatherApi}${cities[antipodeCity].lat}/${cities[antipodeCity].lon}`);
            citiesWeather[antipodeCity] = await res2.json();
            cities[antipodeCity].city = citiesWeather[antipodeCity].name;

            this.updateData();
        }
    }
    
    updateData() {

        if (citiesWeather[currentCity])
        {
            // Update the data for the UI
            this.setState({
                weather: citiesWeather[currentCity].weather[0].id,
                temp: Math.round(citiesWeather[currentCity].main.temp - 273.15), // Kelvin to Celcius
                humidity: Math.round(citiesWeather[currentCity].main.humidity),
                wind: Math.round(citiesWeather[currentCity].wind.speed)          
            });
        }
        if (citiesWeather[antipodeCity])
        {
            // Update the data for the UI
            this.setState({
                antipode_weather: citiesWeather[antipodeCity].weather[0].id,
                antipode_temp: Math.round(citiesWeather[antipodeCity].main.temp - 273.15), // Kelvin to Celcius
                antipode_humidity: Math.round(citiesWeather[antipodeCity].main.humidity),
                antipode_wind: Math.round(citiesWeather[antipodeCity].wind.speed),            
            });
        }
    }

    render() {
    
        // Build class names with dynamic data
        let weatherClass = classNames('wi wi-owm-' + this.state.weather);
        let antipode_weatherClass = classNames('wi wi-owm-' + this.state.antipode_weather);
        let bgColorClass = Tools.setBgColorClass(this.state.temp);
        let antipode_bgColorClass = Tools.setBgColorClass(this.state.antipode_temp);

        // Render the DOM elements
        return (
            <div>
                <div className={bgColorClass}>
                <h1 className="city">Current city:</h1>
                <h1 className="city">{cities[currentCity].city}</h1>
                <div className="weather">
                    <i className={weatherClass}></i>
                </div>
                <section className="weather-details">
                    <div className="temp"><span className="temp-number">{this.state.temp}</span><span className="wi wi-degrees"></span></div>
                    <div className="humidity"><i className="wi wi-raindrop"></i>{this.state.humidity} %</div>
                    <div className="wind"><i className="wi wi-small-craft-advisory"></i>{this.state.wind} <span className="vel">Km/h</span></div>
                </section>
                </div>
                <div className={antipode_bgColorClass}>
                <h1 className="city">Antipode city:</h1>
                <h1 className="city">{cities[antipodeCity].city}</h1>
                <div className="weather">
                    <i className={antipode_weatherClass}></i>
                </div>
                <section className="weather-details">
                    <div className="temp"><span className="temp-number">{this.state.antipode_temp}</span><span className="wi wi-degrees"></span></div>
                    <div className="humidity"><i className="wi wi-raindrop"></i>{this.state.antipode_humidity} %</div>
                    <div className="wind"><i className="wi wi-small-craft-advisory"></i>{this.state.antipode_wind} <span className="vel">Km/h</span></div>
                </section>
                </div>
            </div>
        );
    }
};

export default Weather;
