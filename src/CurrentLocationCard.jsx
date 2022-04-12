import React from 'react';
import { config } from './config';
import Loading from './Loading'
const key = config.API_KEY;
export class CurrentLocationCard extends React.Component {

  constructor() {
    super();

    this.state = {
      location: '',
      country: '',
      temperature: '',
      feelsLike: '',
      tempMax: '',
      tempMin: '',
      sky: '',
      windSpeed: '',
      windDirection: '',
      loading: true
    }
  }

  async componentDidMount() {
    localStorage.clear();
    console.log(this.state.loading);
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getWeather(position.coords.latitude, position.coords.longitude);
        localStorage.setItem('latitude', position.coords.latitude);
        localStorage.setItem('longitude', position.coords.longitude);
      });
    } catch (err) {
      console.log(err);
    }
  }

  async getWeather(lat, lng) {
    try {
      const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${key}`;
      const data = await (await fetch(api)).json();
      console.log(data);

      this.setState({
        location: data.name,
        country: data.sys.country,
        temperature: (data.main.temp - 273.15).toFixed(1),
        feelsLike: (data.main.feels_like - 273.15).toFixed(1),
        tempMax: (data.main.temp_max - 273.15).toFixed(1),
        tempMin: (data.main.temp_min - 273.15).toFixed(1),
        sky: data.weather[0].main,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg
      })
      localStorage.setItem('location', data.name);
      localStorage.setItem('country', data.sys.country);
    } catch (err) {
      console.log(err);
    }
    this.setState({
      loading: false
    })
  };

  render() {
    console.log(this.state.loading);

    return (
      <div className='content'>
        {this.state.loading ?
          // <div className='grey'>Loading your current location</div> :
          <Loading /> :
          <div className='grey'>Your current location</div>
        }
        {this.state.location &&
          <div className='current-location-card'>
            <h2 className="location">{this.state.location}, <span>{this.state.country}</span></h2>
            {/* <div className='main-data'>
              <p className="temperature">{this.state.temperature} C°</p>
              <p className='sky'>{this.state.sky}</p>
            </div> */}
            <ul>
              <li className="temperature">{this.state.temperature} C°</li>
              <li className='sky'>{this.state.sky}</li>
              <li>{this.state.feelsLike} C°<span>feels like</span></li>
              <li>{this.state.tempMin} C°<span>min</span></li>
              <li>{this.state.tempMax} C°<span>max</span></li>
              <li>{this.state.windSpeed} m/s {this.state.windDirection}°<span>wind</span></li>
            </ul>
          </div>
        }
      </div>
    )
  }
}