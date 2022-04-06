import React from 'react';
import { config } from './config';
// import Loading from './Loading'
const key = config.API_KEY;
export class CurrentLocationCard extends React.Component {

  constructor() {
    super();

    this.state = {
      location: '',
      country: '',
      temperature: '',
      sky: '',
      windSpeed: '',
      windDirection: ''
    }
  }

  async componentDidMount() {
    localStorage.clear();
    try {
      navigator.geolocation.getCurrentPosition((position) => {
        this.getWeather(position.coords.latitude, position.coords.longitude);
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
        sky: data.weather[0].main,
        windSpeed: data.wind.speed,
        windDirection: data.wind.deg
      })
    } catch (err) {
      console.log(err);
    }
  };

  render() {

    return (
      // <div>test - {this.state.location}</div>
      <div>
        <div>
          <div>Your current location:</div>
          {this.state.location &&
            <div className="">
              <div className="bold">{this.state.location}, {this.state.country}</div>
              <div className="bold">{this.state.temperature} C°</div>
              <div>{this.state.sky}</div>
              <div>{this.state.windSpeed} m/s {this.state.windDirection}°</div>
            </div>
          }
        </div>
      </div>
    )
  }

}