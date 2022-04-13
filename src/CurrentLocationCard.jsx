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
        // windDirection: data.wind.deg
      })

      let windD = data.wind.deg;

      if (windD > 348 && windD <= 11) { windD = "N" };
      if (windD > 11 && windD <= 33) { windD = "NNE" };
      if (windD > 33 && windD <= 56) { windD = "NE" };
      if (windD > 56 && windD <= 78) { windD = "ENE" };
      if (windD > 78 && windD <= 101) { windD = "E" };
      if (windD > 101 && windD <= 123) { windD = "ESE" };
      if (windD > 123 && windD <= 146) { windD = "SE" };
      if (windD > 146 && windD <= 168) { windD = "SSE" };
      if (windD > 168 && windD <= 191) { windD = "S" };
      if (windD > 191 && windD <= 213) { windD = "SSW" };
      if (windD > 213 && windD <= 236) { windD = "SW" };
      if (windD > 236 && windD <= 258) { windD = "WSW" };
      if (windD > 258 && windD <= 281) { windD = "W" };
      if (windD > 281 && windD <= 303) { windD = "NWN" };
      if (windD > 303 && windD <= 326) { windD = "NW" };
      if (windD > 326 && windD <= 348) { windD = "NNW" };

      this.setState({
        windDirection: windD
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
              <li>{this.state.windSpeed} m/s {this.state.windDirection}<span>wind</span></li>
              {/* <li><svg
                style={{ tansform: [{ rotate: this.state.windDirection }] }}
                width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_201_2)">
                  <path d="M28.9651 51.7957C30.6225 51.7981 30.6319 50.2269 32.0307 46.2565C35.774 35.6355 41.2995 16.126 41.2995 16.126L29.0065 25.3217L16.7389 16.0916C16.7389 16.0916 22.2047 35.6171 25.9156 46.2447C27.3042 50.2207 27.309 51.7919 28.9651 51.7957V51.7957ZM28.7876 46.4511L22.1337 24.1449L29.5018 29.9455L28.7876 46.4511Z" fill="white" />
                </g>
                <defs>
                  <clipPath id="clip0_201_2">
                    <rect width="40" height="40" fill="white" transform="translate(57.2842 29.0413) rotate(135.084)" />
                  </clipPath>
                </defs>
              </svg>
              </li> */}
            </ul>
          </div>
        }
      </div>
    )
  }
}