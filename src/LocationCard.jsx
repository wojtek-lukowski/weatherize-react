import React from 'react';
import { config } from './config';
const key = config.API_KEY;

export class LocationCard extends React.Component {

  constructor(props) {
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
      windDirection: ''
    }
  }

  componentDidMount() {
    this.weatherCity(this.props.city);
  }

  async weatherCity(city) {
    try {
      const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
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
    } catch (err) {
      console.log(err);
    }
  };

  render() {

    return (
      // <div>{this.props.city}</div>
      <div>
        <div>
          {this.state.location &&
            <div className="">
              <div className="bold">{this.props.city}, {this.state.country}</div>
              <div className="bold">{this.state.temperature} C°</div>
              <div>feels like {this.state.feelsLike} C°</div>
              <div>max {this.state.tempMax} C°</div>
              <div>min {this.state.tempMin} C°</div>
              <div>{this.state.sky}</div>
              <div>{this.state.windSpeed} m/s {this.state.windDirection}°</div>
            </div>
          }
        </div>
      </div>
    )
  }

}